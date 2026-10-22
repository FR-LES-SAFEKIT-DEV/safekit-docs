(function () {
  "use strict";

  var formElement = document.getElementById("mktoForm_1624");
  if (!formElement || !window.MktoForms2) return;

  var munchkinId = "247-MBJ-716";
  var formId = 1624;
  var recaptchaSiteKey = "6Le7pcMtAAAAAJXkLnMzsIxNUBiAV-wzbuST3H2R";
  var recaptchaLastUserFingerprint = "";
  var formApi = null;
  var recaptchaApiReady = false;
  var recaptchaReady = false;
  var recaptchaWidgetId = null;
  var submitButton = null;
  var errorElement = document.getElementById("contactMarketoSubmitError");
  var params = new URLSearchParams(window.location.search);

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
    var browserLanguageCode = navigator.language || "en-US";
    if (/^fr(?:-|$)/i.test(browserLanguageCode)) return "French";
    if (/^es-(?:mx|ar|bo|br|cl|co|cr|cu|do|ec|gt|hn|ni|pa|pe|pr|py|sv|uy|ve)/i.test(browserLanguageCode)) return "Latin American Spanish";
    if (/^es(?:-|$)/i.test(browserLanguageCode)) return "European Spanish";
    if (/^de(?:-|$)/i.test(browserLanguageCode)) return "German";
    if (/^it(?:-|$)/i.test(browserLanguageCode)) return "Italian";
    if (/^nl(?:-|$)/i.test(browserLanguageCode)) return "Dutch";
    if (/^pt-br$/i.test(browserLanguageCode)) return "Brazilian Portuguese";
    if (/^en-gb$/i.test(browserLanguageCode)) return "English GB";
    return "English US";
  }

  function currentLanguage() {
    var values = formApi ? formApi.vals() : {};
    return values.preferredLanguage || browserLanguage();
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

  function linkPolicyText(element, pattern, url) {
    if (!element || !pattern || !url || url === "none") return;
    element.innerHTML = element.innerHTML.replace(pattern, function (label) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
    });
  }

  function translateConsentAndPrivacy(translations, values) {
    var htmlText = document.querySelectorAll(".mktoHtmlText");
    if (htmlText.length < 2) return;

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

    var privacyElement = htmlText[htmlText.length - 1];
    var policyUrl = currentLanguage() === "French" ? "https://eviden.com/fr-fr/politique-de-confidentialite/" : "https://eviden.com/privacy-policy/";
    linkPolicyText(privacyElement, /(Privacy Policy|Politique de confidentialité|Informativa sulla privacy|Datenschutzrichtlinie|Política de privacidad|Privacybeleid|Política de Privacidade)/g, policyUrl);
    linkPolicyText(privacyElement, policy.pattern, policy.url);
    if (policy.type === "CCPA") linkPolicyText(privacyElement, policy.pattern2, policy.url2);
  }

  function translateFormLabels() {
    if (!formApi || typeof languageTranslations === "undefined") return;
    var translations = languageTranslations[currentLanguage()];
    if (!translations) return;

    Object.keys(formApi.vals()).forEach(function (fieldName) {
      var fieldTranslation = translations[fieldName];
      if (!fieldTranslation) return;

      var label = document.getElementById("Lbl" + fieldName);
      if (label && fieldTranslation.label) label.innerHTML = fieldTranslation.label;

      if (fieldTranslation.type !== "select" || !Array.isArray(fieldTranslation.options)) return;
      var select = document.getElementById(fieldName);
      if (!select) return;
      Array.prototype.forEach.call(select.options, function (option) {
        var translatedOption = fieldTranslation.options.find(function (item) {
          return item.value === option.value;
        });
        if (translatedOption) option.text = translatedOption.text;
      });
    });

    var submitTranslation = translations.Submit;
    if (submitTranslation && submitTranslation.text && submitButton) {
      submitButton.innerHTML = submitTranslation.text;
    }

    translateConsentAndPrivacy(translations, formApi.vals());
  }

  function fieldValue(values, fieldName) {
    var value = values[fieldName];
    if (Array.isArray(value)) value = value.join(", ");
    return value === undefined || value === null || value === "" ? "not defined" : String(value);
  }

  function selectedLabel(fieldName, values) {
    var select = document.getElementById(fieldName);
    if (select && select.selectedIndex >= 0) return select.options[select.selectedIndex].text;
    return fieldValue(values, fieldName);
  }

  function postLead(values) {
    var payload = new URLSearchParams();
    var fields = {
      url: window.location.href,
      form_id: formElement.id,
      form_type: formElement.getAttribute("form-type"),
      form_destination: formElement.getAttribute("data-destination"),
      form_content: formElement.getAttribute("data-content"),
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
      enquiry_type: selectedLabel("enquiryType", values),
      enquiry_type_not_translated: fieldValue(values, "enquiryType"),
      my_campaign: formElement.getAttribute("data-my-campaign") || "",
      enquiry: fieldValue(values, "enquiry"),
      interested_in: fieldValue(values, "interestedIn"),
      programMemberField01: fieldValue(values, "programMemberField01"),
      programMemberField02: fieldValue(values, "programMemberField02"),
      programMemberField03: fieldValue(values, "programMemberField03"),
      programMemberField04: fieldValue(values, "programMemberField04"),
      purchase_timeline: fieldValue(values, "Purchase_Timeline__c"),
      programMemberField05: fieldValue(values, "programMemberField05"),
      programMemberField06: fieldValue(values, "programMemberField06"),
      reCAPTCHALastUserFingerprint: recaptchaLastUserFingerprint
    };

    Object.keys(fields).forEach(function (key) {
      payload.set(key, fields[key]);
    });

    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 10000);
    return fetch(formElement.getAttribute("data-post-url"), {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: payload.toString(),
      signal: controller.signal
    }).then(function (response) {
      if (!response.ok) throw new Error("Lead post failed with HTTP " + response.status);
    }).finally(function () {
      window.clearTimeout(timeout);
    });
  }

  function validateBusinessEmail() {
    var values = formApi.vals();
    var email = values.Email || "";
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

  function renderRecaptcha() {
    if (!recaptchaApiReady || !formApi || recaptchaWidgetId !== null || !window.grecaptcha) return;

    var marketoElement = formApi.getFormElem()[0];
    var buttonRow = marketoElement.querySelector(".mktoButtonRow");
    var recaptchaContainer = document.createElement("div");
    recaptchaContainer.id = "contactMarketoRecaptcha";
    recaptchaContainer.className = "contact-marketo-recaptcha";
    if (buttonRow) marketoElement.insertBefore(recaptchaContainer, buttonRow);
    else marketoElement.appendChild(recaptchaContainer);

    try {
      recaptchaWidgetId = window.grecaptcha.render(recaptchaContainer, {
        sitekey: recaptchaSiteKey,
        callback: function () {
          recaptchaReady = true;
          if (formApi) formApi.submittable(true);
          if (submitButton) submitButton.disabled = false;
          clearError();
        },
        "expired-callback": function () {
          recaptchaReady = false;
          recaptchaLastUserFingerprint = "";
          if (formApi) formApi.addHiddenFields({ reCAPTCHALastUserFingerprint: "" });
          if (formApi) formApi.submittable(false);
          if (submitButton) submitButton.disabled = true;
        },
        "error-callback": function () {
          recaptchaReady = false;
          if (formApi) formApi.submittable(false);
          if (submitButton) submitButton.disabled = true;
          showError("The security check failed to load. Please reload the page and try again.");
        }
      });
      if (submitButton) submitButton.disabled = true;
      formApi.submittable(false);
    } catch (error) {
      showError("The security check could not be initialized. Please reload the page and try again.");
      console.error("SafeKit contact reCAPTCHA render failed:", error);
    }
  }

  function loadRecaptcha() {
    window.contactMarketoRecaptchaLoaded = function () {
      recaptchaApiReady = true;
      renderRecaptcha();
    };
    var script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=contactMarketoRecaptchaLoaded&render=explicit";
    script.async = true;
    script.onerror = function () {
      showError("The security check could not be loaded. Please reload the page and try again.");
    };
    document.head.appendChild(script);
  }

  loadRecaptcha();

  var enquiryType = params.get("EnquiryTypeId") || params.get("enquiryType") || "Product Information";
  var initialValues = { interestedIn: "High Availability" };
  if (enquiryType) initialValues.enquiryType = enquiryType;
  var preferredLanguage = params.get("preferredLanguage");
  if (preferredLanguage) initialValues.preferredLanguage = preferredLanguage;

  window.MktoForms2.loadForm("//pages.atos.net", "247-MBJ-716", 1624, function (form) {
    formApi = form;
    submitButton = form.getFormElem()[0].querySelector("button[type='submit']");
    var configuredValues = {
      preferredLanguage: preferredLanguage || "English US",
      enquiryType: enquiryType,
      interestedIn: "High Availability",
      SF_Job_Title__c: "Not specified",
      customerIndustry: "Other"
    };
    form.vals(Object.assign(configuredValues, initialValues));
    form.addHiddenFields({ lastFormReferrer: document.location.href });
    ["preferredLanguage", "enquiryType", "interestedIn", "SF_Job_Title__c", "customerIndustry", "Salutation"].forEach(hideFieldRow);
    form.submittable(false);
    if (submitButton) submitButton.disabled = true;
    translateFormLabels();
    renderRecaptcha();

    form.onValidate(function (nativeValid) {
      if (!nativeValid) return;
      if (!validateBusinessEmail()) return;
      if (!recaptchaReady || recaptchaWidgetId === null || !window.grecaptcha) {
        form.submittable(false);
        showError("Please complete the reCAPTCHA checkbox before submitting.");
        return;
      }

      var recaptchaResponse = window.grecaptcha.getResponse(recaptchaWidgetId);
      if (!recaptchaResponse) {
        recaptchaReady = false;
        form.submittable(false);
        showError("Please complete the reCAPTCHA checkbox before submitting.");
        return;
      }

      clearError();
      recaptchaLastUserFingerprint = recaptchaResponse;
      form.addHiddenFields({ reCAPTCHALastUserFingerprint: recaptchaResponse });
    });

    form.onSuccess(function (values, followUpUrl) {
      var destination = formElement.getAttribute("data-destination") || followUpUrl;
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-978904711/Y3XjCIbkmvsBEIfN49ID"
        });
      }
      postLead(values).catch(function (error) {
        console.error("SafeKit lead tracking post failed; continuing to confirmation:", error);
      }).finally(function () {
        window.location.assign(destination);
      });
      return false;
    });

    window.jQuery(form.getFormElem()).on("change", ".mktoField", translateFormLabels);
  });
})();
