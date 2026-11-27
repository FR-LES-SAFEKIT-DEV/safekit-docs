import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import sync_headings_frontmatter as sync


class SyncHeadingsTests(unittest.TestCase):
    def test_expanded_nested_headings_update_front_matter_only(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            shortcodes = root / "shortcodes"
            shortcodes.mkdir()
            (shortcodes / "outer.html").write_text(
                '## Introduction {{ .Get "app" }} {#intro}\n'
                '{{ $.Page.RenderString (printf "{{%% inner app=%q %%}}" (.Get "app")) }}',
                encoding="utf-8",
            )
            (shortcodes / "inner.html").write_text(
                '## Configuration, {{ .Get "app" }} {#config}\n',
                encoding="utf-8",
            )
            source = root / "page.md"
            original = (
                '---\ntitle: "Old"\ntopics: "Old"\n---\n'
                '# Page {#page}\n\n{{% outer app="SafeKit" %}}\n'
            )
            source.write_bytes(original.encode("utf-8"))
            expanded = root / "expanded.md"

            with patch.object(sync, "SHORTCODES", shortcodes):
                self.assertEqual(sync.update_file(source, False, expanded)[0], "updated")
                self.assertEqual(source.read_bytes(), original.encode("utf-8"))
                self.assertEqual(sync.update_file(source, True, expanded)[0], "updated")
                actual = source.read_text(encoding="utf-8")
                self.assertIn('title: "Page"\n', actual)
                self.assertIn(
                    'topics: "Introduction SafeKit, Configuration SafeKit"\n'
                    'hashpart: "intro, config"\n',
                    actual,
                )
                self.assertEqual(actual.split("---\n", 2)[2], original.split("---\n", 2)[2])
                self.assertEqual(sync.update_file(source, False, expanded)[0], "unchanged")

    def test_unresolved_shortcode_is_reported_without_writing(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            source = root / "page.md"
            original = '---\ntitle: "Old"\n---\n# Page\n{{% missing %}}\n'
            source.write_bytes(original.encode("utf-8"))
            with patch.object(sync, "SHORTCODES", root):
                with self.assertRaisesRegex(ValueError, "unexpanded shortcode"):
                    sync.update_file(source, True, root / "expanded.md")
            self.assertEqual(source.read_bytes(), original.encode("utf-8"))


if __name__ == "__main__":
    unittest.main()
