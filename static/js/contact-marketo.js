(function () {
  "use strict";

  var formElement = document.getElementById("mktoForm_1624");
  if (!formElement || !window.MktoForms2) return;

  var params = new URLSearchParams(window.location.search);
  var config = {
    baseUrl: formElement.dataset.baseUrl || "//pages.atos.net",
    customerId: formElement.dataset.customerId || "247-MBJ-716",
    campaign: formElement.dataset.campaign || "",
    myCampaign: formElement.dataset.myCampaign || "",
    display: formElement.dataset.display || "none",
    preferredLanguage: formElement.dataset.preferredLanguage || "English US",
    enquiryType: params.get("EnquiryTypeId") || params.get("enquiryType") || formElement.dataset.enquiryType || "",
    interestedIn: formElement.dataset.interestedIn || "",
    jobTitle: formElement.dataset.jobTitle || "",
    industry: formElement.dataset.industry || "",
    country: formElement.dataset.countryPredefined || "",
    displaySalutation: formElement.dataset.displaySalutation || "true",
    destination: formElement.dataset.destination || "/confirmation-safekit/",
    postUrl: formElement.dataset.postUrl || "",
    recaptchaSiteKey: "6Le7pcMtAAAAAJXkLnMzsIxNUBiAV-wzbuST3H2R"
  };

  var formApi = null;
  var submitButton = null;
  var errorElement = document.getElementById("contactMarketoSubmitError");
  var recaptchaApiReady = false;
  var recaptchaReady = false;
  var recaptchaWidgetId = null;
  var recaptchaToken = "";
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
    if (code.indexOf("fr") === 0) return "French";
    if (code === "es" || code === "es-es") return "European Spanish";
    if (code.indexOf("es-") === 0) return "Latin American Spanish";
    if (code.indexOf("de") === 0) return "German";
    if (code.indexOf("it") === 0) return "Italian";
    if (code.indexOf("nl") === 0) return "Dutch";
    if (code === "pt-br") return "Brazilian Portuguese";
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
      var privacyIndex = privacyOptions.findIndex(function (option) { return option.value === policy.type; });
      if (privacyIndex < 0) privacyIndex = 0;
      if (privacyOptions[privacyIndex]) htmlText[htmlText.length - 1].innerHTML = privacyOptions[privacyIndex].text;
    }
    var privacyUrl = currentLanguage() === "French" ? "https://eviden.com/fr-fr/politique-de-confidentialite/" : "https://eviden.com/privacy-policy/";
    addPolicyLink(htmlText[htmlText.length - 1], /(Privacy Policy|Politique de confidentialité|Informativa sulla privacy|Datenschutzrichtlinie|Política de privacidad|Privacybeleid|Política de Privacidade)/g, privacyUrl);
    addPolicyLink(htmlText[htmlText.length - 1], policy.pattern, policy.url);
    if (policy.type === "CCPA") addPolicyLink(htmlText[htmlText.length - 1], policy.pattern2, policy.url2);
  }

  function translateFormLabels() {
    if (!formApi || typeof languageTranslations === "undefined") return;
    currentTranslations = languageTranslations[currentLanguage()];
    if (!currentTranslations) return;
    Object.keys(formApi.vals()).forEach(function (fieldName) {
      var fieldTranslation = currentTranslations[fieldName];
      if (!fieldTranslation) return;
      var label = document.getElementById("Lbl" + fieldName);
      if (label && fieldTranslation.label) label.innerHTML = fieldTranslation.label;
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
    var enquirySelect = document.getElementById("enquiryType");
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
      enquiry_type: enquirySelect && enquirySelect.selectedIndex >= 0 ? enquirySelect.options[enquirySelect.selectedIndex].text : fieldValue(values, "enquiryType"),
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
    var email = formApi.vals().Email || "";
    var emailField = window.jQuery(formApi.getFormElem()).find("#Email");
    var domain = email.split("@")[1];
    if (!domain || ["gmail.com", "yahoo.com", "outlook.com"].indexOf(domain.toLowerCase()) !== -1) {
      formApi.showErrorMessage("Please enter your business email address", emailField);
      var input = document.getElementById("Email");
      if (input) input.focus();
      return false;
    }
    return true;
  }

  function applyShortcodeSettings(form) {
    var values = {
      preferredLanguage: config.preferredLanguage,
      interestedIn: config.interestedIn,
      SF_Job_Title__c: config.jobTitle,
      customerIndustry: config.industry
    };
    if (config.enquiryType) values.enquiryType = config.enquiryType;
    if (config.country) values.Country = config.country;
    form.vals(values);
    var hidden = { lastFormReferrer: document.location.href };
    if (config.myCampaign) hidden.programMemberField01 = config.myCampaign;
    form.addHiddenFields(hidden);
    if (config.display === "none") {
      ["preferredLanguage", "enquiryType", "interestedIn", "SF_Job_Title__c", "customerIndustry"].forEach(hideFieldRow);
      if (config.country === "Costa Rica") hideFieldRow("Country");
    }
    if (config.displaySalutation === "false") hideFieldRow("Salutation");
  }

  var formApi = null;
  var submitButton = null;
  var recaptchaApiReady = false;
  var recaptchaReady = false;
  var recaptchaWidgetId = null;
  var recaptchaToken = "";
  var errorElement = document.getElementById("contactMarketoSubmitError");

  function renderRecaptcha() {
    if (!recaptchaApiReady || !formApi || recaptchaWidgetId !== null || !window.grecaptcha) return;
    var marketoElement = formApi.getFormElem()[0];
    var buttonRow = marketoElement.querySelector(".mktoButtonRow");
    var container = document.createElement("div");
    container.id = "contactMarketoRecaptcha";
    container.className = "contact-marketo-recaptcha";
    if (buttonRow) marketoElement.insertBefore(container, buttonRow);
    else marketoElement.appendChild(container);
    try {
      recaptchaWidgetId = window.grecaptcha.render(container, {
        sitekey: config.recaptchaSiteKey,
        callback: function (token) {
          recaptchaReady = true;
          recaptchaToken = token;
          formApi.submittable(true);
          if (submitButton) submitButton.disabled = false;
          clearError();
        },
        "expired-callback": function () {
          recaptchaReady = false;
          recaptchaToken = "";
          formApi.submittable(false);
          if (submitButton) submitButton.disabled = true;
        },
        "error-callback": function () {
          recaptchaReady = false;
          formApi.submittable(false);
          if (submitButton) submitButton.disabled = true;
          showError("The security check failed to load. Please reload the page and try again.");
        }
      });
      formApi.submittable(false);
      if (submitButton) submitButton.disabled = true;
    } catch (error) {
      showError("The security check could not be initialized. Please reload the page and try again.");
      console.error("SafeKit contact reCAPTCHA render failed:", error);
    }
  }

  function initializeRecaptcha() {
    window.contactMarketoRecaptchaLoaded = function () {
      recaptchaApiReady = true;
      renderRecaptcha();
    };
    var script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=contactMarketoRecaptchaLoaded&render=explicit";
    script.async = true;
    script.onerror = function () { showError("The security check could not be loaded. Please reload the page and try again."); };
    document.head.appendChild(script);
  }

  initializeRecaptcha();
  window.MktoForms2.loadForm(config.baseUrl, config.customerId, config.formId, function (form) {
    formApi = form;
    submitButton = form.getFormElem()[0].querySelector("button[type='submit']");
    applyShortcodeSettings(form);
    translateFormLabels();
    form.submittable(false);
    if (submitButton) submitButton.disabled = true;
    renderRecaptcha();

    form.onValidate(function (nativeValid) {
      if (!nativeValid) return;
      if (!validateBusinessEmail()) {
        form.submittable(false);
        return;
      }
      var token = window.grecaptcha && recaptchaWidgetId !== null ? window.grecaptcha.getResponse(recaptchaWidgetId) : "";
      if (!recaptchaReady || !token) {
        recaptchaReady = false;
        form.submittable(false);
        showError("Please complete the reCAPTCHA checkbox before submitting.");
        return;
      }
      recaptchaToken = token;
      form.addHiddenFields({ reCAPTCHALastUserFingerprint: token });
      form.submittable(true);
      clearError();
    });

    form.onSuccess(function (values, followUpUrl) {
      var destination = config.destination || followUpUrl;
      if (typeof window.gtag === "function") window.gtag("event", "conversion", { send_to: "AW-978904711/Y3XjCIbkmvsBEIfN49ID" });
      postLead(values, recaptchaToken).catch(function (error) {
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
