"use strict";

const queryParams = new URLSearchParams(window.location.search);
const form = document.querySelector(".contact-safekit-form");

const normalizeLabel = (label) =>
  label
    .replace(/\*/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s/-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

const getParam = (key) => {
  const exactValue = queryParams.get(key);
  if (exactValue !== null) return exactValue;

  const entry = [...queryParams.entries()].find(
    ([name]) => normalizeLabel(name) === key,
  );
  return entry?.[1] ?? null;
};

form?.querySelectorAll(".contact-safekit-field").forEach((fieldGroup) => {
  const label = fieldGroup.querySelector("label");
  const field = fieldGroup.querySelector("input, select, textarea");
  const requestedValue =
    (label && getParam(normalizeLabel(label.textContent))) ??
    (field?.name && getParam(normalizeLabel(field.name)));
  if (!field || requestedValue === null || requestedValue === "") return;

  if (field instanceof HTMLSelectElement) {
    const matchingOption = [...field.options].find(
      (option) => option.value.trim().toLowerCase() === requestedValue.trim().toLowerCase(),
    );
    if (matchingOption) field.value = matchingOption.value;
    return;
  }

  field.value = requestedValue;
});

const optInGroup = form?.querySelector(".contact-safekit-optin");
const optInLegend = optInGroup?.querySelector("legend");
const optInName = optInGroup?.querySelector('input[type="radio"]')?.name;
const requestedOptIn =
  (optInLegend && getParam(normalizeLabel(optInLegend.textContent))) ??
  (optInName && getParam(normalizeLabel(optInName)));
if (optInGroup && requestedOptIn) {
  const matchingRadio = [...optInGroup.querySelectorAll('input[type="radio"]')].find(
    (radio) => radio.value.toLowerCase() === requestedOptIn.trim().toLowerCase(),
  );
  if (matchingRadio) matchingRadio.checked = true;
}
