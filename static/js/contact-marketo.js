(function () {
  "use strict";

  var formElement = document.getElementById("mktoForm_1624");
  if (!formElement || !window.MktoForms2) return;

  var params = new URLSearchParams(window.location.search);
  var config = {
    baseUrl: formElement.dataset.baseUrl || "https://pages.atos.net",
    customerId: formElement.dataset.customerId || "247-MBJ-716",
    formId: Number(formElement.dataset.formId || "1624"),
    campaign: formElement.dataset.campaign || "",
    myCampaign: formElement.dataset.myCampaign || "",
    display: formElement.dataset.display || "none",
    preferredLanguage: formElement.dataset.preferredLanguage || "English US",
    enquiryType: formElement.dataset.enquiryType || "",
    interestedIn: formElement.dataset.interestedIn || "",
    jobTitle: formElement.dataset.jobTitle || "",
    industry: formElement.dataset.industry || "",
    country: formElement.dataset.countryPredefined || "",
    displaySalutation: formElement.dataset.displaySalutation || "true",
    destination: formElement.dataset.destination || "/confirmation-safekit/",
    postUrl: formElement.dataset.postUrl || "",
    recaptchaSiteKey: formElement.dataset.recaptchaSiteKey || ""
  };

  var formApi = null;
  var submitButton = null;
  var errorElement = document.getElementById("contactMarketoSubmitError");
  var recaptchaApiReady = false;
  var recaptchaToken = "";
  var leadPostRecaptchaToken = "";
  var validationLocked = false;
  var replayingValidatedSubmit = false;
  var currentTranslations = null;

  function showError(message) {
    if (!errorElement) return;
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function clearError() {
    if (!errorElement) return;
    errorElement.textContent = "";
    errorElement.hidden = true;
  }

  function browserLanguage() {
    var code = (navigator.language || "en-US").toLowerCase();
    if (code.indexOf("ar") === 0) return "AR";
    if (code.indexOf("ko") === 0) return "KO";
    if (code.indexOf("fr") === 0) return "French";
    if (code === "es" || code === "es-es") return "European Spanish";
    if (code.indexOf("es-") === 0) return "Latin American Spanish";
    if (code.indexOf("de") === 0) return "German";
    if (code.indexOf("it") === 0) return "Italian";
    if (code.indexOf("nl") === 0) return "Dutch";
    if (code === "pt-br") return "Brazilian Portuguese";
    if (code === "pt" || code === "pt-pt") return "PT-PT";
    if (code === "en-gb") return "English GB";
    return "English US";
  }

  function currentLanguage() {
    return formApi && formApi.vals().preferredLanguage || config.preferredLanguage || browserLanguage();
  }

  function hideFieldRow(fieldName) {
    var field = document.getElementById(fieldName);
    var row = field && field.closest(".mktoFormRow");
    if (row) row.style.display = "none";
  }

  function privacySettings(values) {
    var country = values.Country || "";
    if (["United Kingdom", "Isle of Man", "Gibraltar"].indexOf(country) !== -1) {
      return { type: "DPA", url: "https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted", pattern: /DPA|APD/g };
    }
    if (country === "United States" && values.State === "CA") {
      return { type: "CCPA", url: "https://oag.ca.gov/privacy/ccpa", pattern: /CCPA/g, url2: "https://thecpra.org/", pattern2: /CPRA/g };
    }
    if (country === "Canada") return { type: "CASL", url: "https://laws-lois.justice.gc.ca/eng/acts/E-1.6/index.html", pattern: /CASL/g };
    if (country === "Brazil") return { type: "LGDP", url: "https://lgpd-brazil.info/", pattern: /LGPD/g };
    if (country === "South Africa") return { type: "POPIA", url: "https://popia.co.za/", pattern: /POPIA/g };
    if (country === "Mexico") return { type: "LFPDPPP", url: "https://privacyinternational.org/state-privacy/mexico#dataprotection", pattern: /LFPDPPP/g };
    if (typeof listOfEuropeanCountries !== "undefined" && listOfEuropeanCountries.indexOf(country) !== -1) {
      return { type: "GDPR", url: "https://gdpr.eu/", pattern: /GDPR|RGPD|DSGVO|AVG/g };
    }
    return { type: "none", url: "none", pattern: null };
  }

  function addPolicyLink(element, pattern, url) {
    if (!element || !pattern || !url || url === "none") return;
    element.innerHTML = element.innerHTML.replace(pattern, function (label) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
    });
  }

  function translateConsentAndPrivacy(translations, values) {
    var htmlText = document.querySelectorAll(".mktoHtmlText");
    if (!translations || htmlText.length < 2) return;
    var policy = privacySettings(values);
    var optInOptions = translations.OptInText;
    if (Array.isArray(optInOptions)) {
      var optInIndex = optInOptions.findIndex(function (option) { return option.value === policy.type; });
      if (optInIndex < 0 || policy.type !== "CCPA") optInIndex = 0;
      if (optInOptions[optInIndex]) htmlText[htmlText.length - 2].innerHTML = optInOptions[optInIndex].text;
    }
    var privacyOptions = translations.PrivacyText;
    if (Array.isArray(privacyOptions)) {
      var privacyText = privacyOptions.find(function (option) { return option.value === "none"; });
      if (privacyText) htmlText[htmlText.length - 1].innerHTML = privacyText.text;
    }
    var privacyUrl = currentLanguage() === "French" ? "https://eviden.com/fr-fr/politique-de-confidentialite/" : "https://eviden.com/privacy-policy/";
    addPolicyLink(htmlText[htmlText.length - 1], /(Privacy Policy|Politique de confidentialité|Informativa sulla privacy|Datenschutzrichtlinie|Política de privacidad|Privacybeleid|Política de Privacidade|隐私政策)/g, privacyUrl);
  }

  function translateFormLabels() {
    if (!formApi || typeof languageTranslations === "undefined") return;
    currentTranslations = languageTranslations[currentLanguage()];
    if (!currentTranslations) return;
    formApi.getFormElem()[0].dir = currentLanguage() === "AR" ? "rtl" : "ltr";
    Object.keys(formApi.vals()).forEach(function (fieldName) {
      if (fieldName === "preferredLanguage") return;
      var fieldTranslation = currentTranslations[fieldName];
      if (!fieldTranslation) return;
      var label = document.getElementById("Lbl" + fieldName);
      if (label && fieldTranslation.label) label.innerHTML = fieldTranslation.label;
      if (fieldTranslation.type === "radio" && Array.isArray(fieldTranslation.options)) {
        Array.prototype.forEach.call(formApi.getFormElem()[0].querySelectorAll('input[type="radio"]'), function (input) {
          if (input.name !== fieldName) return;
          var translated = fieldTranslation.options.find(function (item) { return item.value === input.value; });
          if (!translated) return;
          Array.prototype.forEach.call(input.labels || [], function (optionLabel) {
            if (!optionLabel.contains(input)) optionLabel.textContent = translated.text;
          });
        });
        return;
      }
      if (fieldTranslation.type !== "select" || !Array.isArray(fieldTranslation.options)) return;
      var select = document.getElementById(fieldName);
      if (!select) return;
      Array.prototype.forEach.call(select.options, function (option) {
        var translated = fieldTranslation.options.find(function (item) { return item.value === option.value; });
        if (translated) option.text = translated.text;
      });
    });
    var submit = currentTranslations.Submit;
    if (submit && submit.text && submitButton) submitButton.innerHTML = submit.text;
    translateConsentAndPrivacy(currentTranslations, formApi.vals());
  }

  function fieldValue(values, fieldName) {
    var value = values[fieldName];
    if (Array.isArray(value)) value = value.join(", ");
    return value === undefined || value === null || value === "" ? "not defined" : String(value);
  }

  function postLead(values, recaptchaResponse) {
    if (!config.postUrl) return Promise.resolve();
    var payload = new URLSearchParams();
    var fields = {
      url: window.location.href,
      form_id: formElement.id,
      form_type: formElement.getAttribute("form-type"),
      form_destination: config.destination,
      form_content: formElement.getAttribute("data-content"),
      campaign: config.campaign,
      my_campaign: config.myCampaign,
      preferred_language: fieldValue(values, "preferredLanguage"),
      salutation: fieldValue(values, "Salutation"),
      first_name: fieldValue(values, "FirstName"),
      last_name: fieldValue(values, "LastName"),
      email: fieldValue(values, "Email"),
      phone: fieldValue(values, "Phone"),
      job_function: fieldValue(values, "JobFunction__c"),
      job_title: fieldValue(values, "SF_Job_Title__c"),
      company: fieldValue(values, "Company"),
      company_revenue: fieldValue(values, "Company_Revenue__c"),
      company_size: fieldValue(values, "Company_Size__c"),
      industry: fieldValue(values, "customerIndustry"),
      country: fieldValue(values, "Country"),
      purchase_authority: fieldValue(values, "Purchase_Authority__c"),
      opt_in: fieldValue(values, "Opt_in__c"),
      enquiry_type: fieldValue(values, "enquiryType"),
      enquiry_type_not_translated: fieldValue(values, "enquiryType"),
      enquiry: fieldValue(values, "enquiry"),
      interested_in: fieldValue(values, "interestedIn"),
      programMemberField01: fieldValue(values, "programMemberField01"),
      programMemberField02: fieldValue(values, "programMemberField02"),
      programMemberField03: fieldValue(values, "programMemberField03"),
      programMemberField04: fieldValue(values, "programMemberField04"),
      purchase_timeline: fieldValue(values, "Purchase_Timeline__c"),
      programMemberField05: fieldValue(values, "programMemberField05"),
      programMemberField06: fieldValue(values, "programMemberField06"),
      reCAPTCHALastUserFingerprint: recaptchaResponse
    };
    Object.keys(fields).forEach(function (key) { payload.set(key, fields[key]); });
    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 10000);
    return fetch(config.postUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: payload.toString(),
      signal: controller.signal
    }).then(function (response) {
      if (!response.ok) throw new Error("Lead post failed with HTTP " + response.status);
    }).finally(function () { window.clearTimeout(timeout); });
  }

  function validateBusinessEmail() {
    var email = String(formApi.vals().Email || "").trim();
    var domain = email.split("@")[1];
    var emailField = formApi.getFormElem()[0].querySelector('input[name="Email"]');
    var invalidFormat = emailField && (emailField.validity.typeMismatch || emailField.classList.contains("mktoInvalid"));
    if (!domain || invalidFormat || ["gmail.com", "yahoo.com", "outlook.com"].indexOf(domain.toLowerCase()) !== -1) {
      if (emailField) emailField.focus();
      formApi.showErrorMessage("Please enter your business email address", window.MktoForms2.$(emailField));
      return false;
    }
    return true;
  }

  function applyShortcodeSettings(form) {
    var languageField = form.getFormElem()[0].querySelector('select[name="preferredLanguage"]');
    if (languageField) {
      ["Japanese", "ZH-HANS", "Spanish", "AR", "PT-PT", "KO"].forEach(function (language) {
        var existing = Array.prototype.find.call(languageField.options, function (option) { return option.value === language; });
        if (!existing) languageField.add(new Option(language, language));
        else if (language === "ZH-HANS") existing.text = language;
      });
    }
    var values = {
      preferredLanguage: config.preferredLanguage,
      interestedIn: config.interestedIn,
      SF_Job_Title__c: config.jobTitle,
      customerIndustry: config.industry
    };
    if (config.enquiryType) values.enquiryType = config.enquiryType;
    if (config.country) values.Country = config.country;
    form.vals(values);
    var appliedValues = form.vals();
    var hidden = { lastFormReferrer: document.location.href };
    if (config.myCampaign) hidden.programMemberField01 = config.myCampaign;
    form.addHiddenFields(hidden);
    if (config.display === "none") {
      ["preferredLanguage", "enquiryType", "interestedIn", "SF_Job_Title__c", "customerIndustry"].forEach(function (fieldName) {
        if (values[fieldName] && appliedValues[fieldName] === values[fieldName]) hideFieldRow(fieldName);
      });
      if (config.country === "Costa Rica" && appliedValues.Country === config.country) hideFieldRow("Country");
    }
    if (config.display !== "all" && config.display !== "hidden" && config.displaySalutation === "false") hideFieldRow("Salutation");
  }

  function showAllFields(form) {
    if (config.display !== "all" && config.display !== "hidden") return;
    var element = form.getFormElem()[0];
    var panel = element.querySelector(".contact-marketo-hidden-fields");
    var table = null;
    if (config.display === "hidden") {
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "contact-marketo-hidden-fields";
        panel.style.clear = "both";
        panel.style.color = "#fff";
        panel.style.padding = "1rem 0";
        element.appendChild(panel);
      }
      panel.replaceChildren();
      var heading = document.createElement("h3");
      heading.textContent = "Champs caches (diagnostic, lecture seule)";
      heading.style.color = "#fff";
      panel.appendChild(heading);
      table = document.createElement("table");
      table.style.width = "100%";
      table.style.tableLayout = "fixed";
      table.style.overflowWrap = "anywhere";
      panel.appendChild(table);
    }
    Array.prototype.forEach.call(element.querySelectorAll("input[name], select[name], textarea[name]"), function (field) {
      if (/^(button|submit|reset|image)$/i.test(field.type)) return;
      if (field.type === "hidden" || /^(g-recaptcha-response|reCAPTCHALastUserFingerprint)$/i.test(field.name)) {
        if (!table) return;
        var row = table.insertRow();
        var label = document.createElement("th");
        label.scope = "row";
        label.style.textAlign = "left";
        label.textContent = field.name;
        row.appendChild(label);
        var valueCell = row.insertCell();
        valueCell.textContent = field.value || "(vide)";
        [label, valueCell].forEach(function (cell) {
          cell.style.setProperty("color", "#002d3c", "important");
          cell.style.setProperty("background-color", cell === label ? "#e7eef0" : "#fff", "important");
          cell.style.padding = "8px 10px";
          cell.style.verticalAlign = "top";
          cell.style.whiteSpace = "normal";
          cell.style.overflowWrap = "anywhere";
        });
        return;
      }
      var parent = field;
      while (parent && parent !== element) {
        parent.hidden = false;
        if (window.getComputedStyle(parent).display === "none") {
          parent.style.setProperty("display", "block", "important");
        }
        parent.style.setProperty("visibility", "visible", "important");
        parent = parent.parentElement;
      }
    });
    if (panel) panel.hidden = !table || table.rows.length === 0;
  }

  function applyQueryParameters(form) {
    var groups = Object.create(null);
    var aliases = {
      interestedIn: ["Product", "product", "prod"],
      enquiryType: ["EnquiryTypeId", "InquiryTypeId", "inquiry", "enquiry"]
    };
    var controls = form.getFormElem()[0].querySelectorAll("input[name], select[name], textarea[name]");
    Array.prototype.forEach.call(controls, function (control) {
      if (/^(button|submit|reset|image|file|password)$/i.test(control.type)) return;
      if (/^(g-recaptcha-response|reCAPTCHALastUserFingerprint)$/i.test(control.name)) return;
      if (!groups[control.name]) groups[control.name] = [];
      groups[control.name].push(control);
    });

    function normalize(value) {
      return String(value || "").trim().toLowerCase();
    }

    function applyField(fieldName) {
      var keys = [fieldName].concat(aliases[fieldName] || []);
      var key = keys.find(function (candidate) {
        return params.has(candidate) && (candidate === fieldName || !groups[candidate]);
      });
      if (key === undefined) return;
      var fields = groups[fieldName];
      var first = fields[0];
      var rawValues = params.getAll(key);
      var value = rawValues[0];
      var isSelect = first.tagName === "SELECT";
      var isChoice = first.type === "checkbox" || first.type === "radio";
      if (isSelect || isChoice) {
        var options = isSelect ? Array.prototype.slice.call(first.options) : fields;
        var matchedValues = [];
        var booleanCheckbox = first.type === "checkbox" && fields.length === 1 && /^(true|false|1|0|yes|no|on|off)$/i.test(value);
        if (booleanCheckbox) {
          if (/^(true|1|yes|on)$/i.test(value)) matchedValues.push(first.value);
        } else {
          var valid = rawValues.every(function (raw) {
            var match = options.find(function (option) { return option.value === raw; });
            if (!match) {
              match = options.find(function (option) {
                var label = isSelect ? option.label : Array.prototype.map.call(option.labels || [], function (element) { return element.textContent; }).join(" ");
                return normalize(label) === normalize(raw);
              });
            }
            if (!match) return false;
            matchedValues.push(match.value);
            return true;
          });
          if (!valid) return;
        }
        value = first.multiple || first.type === "checkbox" && fields.length > 1 ? matchedValues : matchedValues[0] || "";
      }
      var update = {};
      update[fieldName] = value;
      form.vals(update);
      fields.forEach(function (field) {
        field.dispatchEvent(new Event("change", { bubbles: true }));
        field.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }

    if (groups.preferredLanguage) {
      applyField("preferredLanguage");
      translateFormLabels();
    }
    Object.keys(groups).forEach(function (fieldName) {
      if (fieldName !== "preferredLanguage") applyField(fieldName);
    });
  }

  var formApi = null;
  var submitButton = null;
  var recaptchaApiReady = false;
  var recaptchaWidgetId = null;
  var leadPostRecaptchaToken = "";
  var errorElement = document.getElementById("contactMarketoSubmitError");
  var skipRecaptcha = ["localhost", "127.0.0.1", "[::1]"].indexOf(window.location.hostname) !== -1;

  function renderRecaptcha() {
    if (!recaptchaApiReady || !formApi || recaptchaWidgetId !== null || !window.grecaptcha) return;
    var marketoElement = formApi.getFormElem()[0];
    var buttonRow = marketoElement.querySelector(".mktoButtonRow");
    var container = document.createElement("div");
    container.id = "contactMarketoRecaptcha";
    container.className = "contact-marketo-recaptcha";
    if (buttonRow) marketoElement.insertBefore(container, buttonRow);
    else marketoElement.appendChild(container);

    function alignRecaptcha() {
      var textBlocks = marketoElement.querySelectorAll(".mktoHtmlText");
      var privacyText = textBlocks[textBlocks.length - 1];
      if (!privacyText) return;
      var textBounds = privacyText.getBoundingClientRect();
      var containerBounds = container.getBoundingClientRect();
      var textStyle = window.getComputedStyle(privacyText);
      var rtl = window.getComputedStyle(marketoElement).direction === "rtl";
      var offset = rtl ? containerBounds.right - textBounds.right + parseFloat(textStyle.paddingRight || "0") :
        textBounds.left - containerBounds.left + parseFloat(textStyle.paddingLeft || "0");
      container.style.paddingInlineStart = Math.max(0, offset) + "px";
    }
    alignRecaptcha();
    if (window.ResizeObserver) new window.ResizeObserver(alignRecaptcha).observe(marketoElement);

    try {
      recaptchaWidgetId = window.grecaptcha.render(container, {
        sitekey: config.recaptchaSiteKey,
        callback: function (token) {
          leadPostRecaptchaToken = token;
          formApi.submittable(true);
          clearError();
        },
        "expired-callback": function () {
          leadPostRecaptchaToken = "";
          formApi.submittable(false);
        },
        "error-callback": function () {
          leadPostRecaptchaToken = "";
          formApi.submittable(false);
          showError("The security check failed to load. Please reload the page and try again.");
        }
      });
      formApi.submittable(false);
    } catch (error) {
      showError("The security check could not be initialized. Please reload the page and try again.");
      console.error("SafeKit contact reCAPTCHA render failed:", error);
    }
  }

  function initializeRecaptcha() {
    var languageCodes = {
      "English US": "en", "English GB": "en-GB", "French": "fr", "German": "de",
      "Italian": "it", "Spanish": "es", "European Spanish": "es", "Latin American Spanish": "es-419",
      "Dutch": "nl", "Brazilian Portuguese": "pt-BR", "PT-PT": "pt-PT",
      "Japanese": "ja", "ZH-HANS": "zh-CN", "AR": "ar", "KO": "ko"
    };
    window.contactMarketoRecaptchaLoaded = function () {
      recaptchaApiReady = true;
      renderRecaptcha();
    };
    var script = document.createElement("script");
    var apiUrl = new URL("https://www.google.com/recaptcha/api.js");
    apiUrl.search = new URLSearchParams({
      onload: "contactMarketoRecaptchaLoaded",
      render: "explicit",
      hl: languageCodes[currentLanguage()] || "en"
    }).toString();
    script.src = apiUrl.toString();
    script.async = true;
    script.onerror = function () { showError("The security check could not be loaded. Please reload the page and try again."); };
    document.head.appendChild(script);
  }

  window.MktoForms2.loadForm(config.baseUrl, config.customerId, config.formId, function (form) {
    formApi = form;
    submitButton = form.getFormElem()[0].querySelector("button[type='submit']");
    applyShortcodeSettings(form);
    translateFormLabels();
    applyQueryParameters(form);
    translateFormLabels();
    showAllFields(form);
    if (config.display === "all" || config.display === "hidden") {
      form.getFormElem()[0].addEventListener("change", function () { showAllFields(form); });
      window.MktoForms2.whenRendered(function (renderedForm) {
        if (renderedForm.getFormElem()[0] === form.getFormElem()[0]) showAllFields(form);
      });
    }
    form.submittable(skipRecaptcha);
    if (!skipRecaptcha) initializeRecaptcha();
    renderRecaptcha();

    form.onValidate(function (nativeValid) {
      showAllFields(form);
      if (!validateBusinessEmail()) {
        form.submittable(false);
        return;
      }
      if (!nativeValid) {
        showError("Please complete all required fields and correct the highlighted values before submitting.");
        return;
      }
      if (skipRecaptcha) {
        form.submittable(true);
        clearError();
        return;
      }
      var token = window.grecaptcha && recaptchaWidgetId !== null ? window.grecaptcha.getResponse(recaptchaWidgetId) : "";
      if (!token) {
        form.submittable(false);
        showError("Please complete the reCAPTCHA checkbox before submitting.");
        return;
      }
      leadPostRecaptchaToken = token;
      form.addHiddenFields({ reCAPTCHALastUserFingerprint: token });
      form.submittable(true);
      clearError();
    });

    form.onSuccess(function (values, followUpUrl) {
      var destination = config.destination || followUpUrl;
      if (typeof window.gtag === "function") window.gtag("event", "conversion", { send_to: "AW-978904711/Y3XjCIbkmvsBEIfN49ID" });
      postLead(values, leadPostRecaptchaToken).catch(function (error) {
        console.error("SafeKit lead tracking post failed; continuing to confirmation:", error);
      }).finally(function () {
        window.location.assign(destination);
      });
      return false;
    });

    if (window.jQuery) window.jQuery(form.getFormElem()).on("change", ".mktoField", translateFormLabels);
    form.getFormElem().on("focusin", ".mktoErrorMsg", function () {
      if (typeof languageTranslations === "undefined") return;
      var translations = languageTranslations[currentLanguage()];
      var field = translations && translations[this.id.replace("ValidMsg", "")];
      if (field && field.requiredError) this.textContent = field.requiredError;
    });
  });
})();
