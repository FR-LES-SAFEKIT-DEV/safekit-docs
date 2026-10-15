---
title: "SafeKit contact form"
description: "Standalone contact form for SafeKit information requests."
lang: "en"
category: "home"
sitemap:
  disable: true
---

<div class="contact-safekit-page">
  <h1>Contact SafeKit</h1>
  <div class="contact-safekit-intro">
    <p>This standalone form is an alternative to the <a href="/contact-us-for-safekit/">embedded contact form</a>.</p>
    <p>Test access to <a href="https://formsubmit.co/" target="_blank" rel="noopener noreferrer">FormSubmit</a> to check whether this form works in your environment.</p>
  </div>

  <form class="contact-safekit-form" action="https://formsubmit.co/bruno.rochat@eviden.com" method="POST">
    <input type="hidden" name="_subject" value="[safekit.eviden.com] CONTACT_EN / SafeKit High Availability">
    <input type="hidden" name="_next" value="https://safekit.eviden.com/confirmation-safekit/">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_captcha" value="true">
    <div class="contact-safekit-honeypot" aria-hidden="true">
      <label for="contact-safekit-website">Leave this field empty</label>
      <input id="contact-safekit-website" type="text" name="_honey" tabindex="-1" autocomplete="off">
    </div>
    <div class="contact-safekit-field">
      <label for="contact-safekit-inquiry-type">Inquiry Type <span aria-hidden="true">*</span></label>
      <select id="contact-safekit-inquiry-type" name="Inquiry Type" required>
        <option value="Information" selected>Information</option>
        <option value="Price">Price</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="contact-safekit-field">
      <label for="contact-safekit-first-name">First Name <span aria-hidden="true">*</span></label>
      <input id="contact-safekit-first-name" name="First name" type="text" autocomplete="given-name" required maxlength="100">
    </div>
    <div class="contact-safekit-field">
      <label for="contact-safekit-last-name">Last Name <span aria-hidden="true">*</span></label>
      <input id="contact-safekit-last-name" name="Last name" type="text" autocomplete="family-name" required maxlength="100">
    </div>
    <div class="contact-safekit-field">
      <label for="contact-safekit-company">Company/Organization Name <span aria-hidden="true">*</span></label>
      <input id="contact-safekit-company" name="Company" type="text" autocomplete="organization" required maxlength="180">
    </div>
    <div class="contact-safekit-field">
      <label for="contact-safekit-country">Country <span aria-hidden="true">*</span></label>
      <select id="contact-safekit-country" name="Country" autocomplete="country-name" required>
        <option value="" selected disabled>Please select</option>
        <option value="Afghanistan">Afghanistan</option><option value="Aland Islands">Aland Islands</option><option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option><option value="Antarctica">Antarctica</option><option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option><option value="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option><option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option><option value="British Virgin Islands">British Virgin Islands</option><option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
        <option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote d'Ivoire">Cote d'Ivoire</option>
        <option value="Crimea Region">Crimea Region</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option>
        <option value="Curaçao">Curaçao</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
        <option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option>
        <option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option>
        <option value="French Southern Territories">French Southern Territories</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option><option value="Guernsey">Guernsey</option><option value="Guinea">Guinea</option>
        <option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option>
        <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option><option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option><option value="Honduras">Honduras</option>
        <option value="Hong Kong S.A.R., China">Hong Kong S.A.R., China</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option>
        <option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
        <option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Isle of Man">Isle of Man</option>
        <option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option><option value="Jersey">Jersey</option><option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option>
        <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option><option value="Korea, Republic of">Korea, Republic of</option><option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option><option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option><option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option>
        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option><option value="Macao S.A.R., China">Macao S.A.R., China</option><option value="Macedonia, the former Yugoslav Republic of">Macedonia, the former Yugoslav Republic of</option>
        <option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option>
        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Moldova, Republic of">Moldova, Republic of</option><option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option>
        <option value="N.Mariana Islnd">N. Mariana Islands</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option>
        <option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option>
        <option value="Norfolk Island">Norfolk Island</option><option value="North Korea">North Korea</option><option value="Norway">Norway</option>
        <option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option>
        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option>
        <option value="Pitcairn">Pitcairn</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option><option value="Russian Federation">Russian Federation</option><option value="Rwanda">Rwanda</option>
        <option value="Saint Barthélemy">Saint Barthélemy</option><option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option><option value="Saint Martin (French part)">Saint Martin (French part)</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="Samoa, American">Samoa, American</option>
        <option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
        <option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
        <option value="South Sudan">South Sudan</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option>
        <option value="Syrian Arab Republic">Syrian Arab Republic</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option><option value="Thailand">Thailand</option><option value="Timor-Leste">Timor-Leste</option>
        <option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Uruguay">Uruguay</option>
        <option value="US Minor Outl.Isl.">US Minor Outl. Isl.</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option><option value="Vietnam">Viet Nam</option><option value="Virgin Islands, British">Virgin Islands, British</option>
        <option value="Virgin Islands, US">Virgin Islands, US</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option>
      </select>
    </div>
    <div class="contact-safekit-field">
      <label for="contact-safekit-inquiry">Inquiry</label>
      <textarea id="contact-safekit-inquiry" name="Inquiry" rows="5" maxlength="5000" placeholder="How can we help?"></textarea>
    </div>
    <fieldset class="contact-safekit-optin">
      <legend>Opt-in <span aria-hidden="true">*</span></legend>
      <label><input type="radio" name="Opt-in" value="Yes" required> Yes</label>
      <label><input type="radio" name="Opt-in" value="No" required> No</label>
    </fieldset>
    <p class="contact-safekit-note"><span aria-hidden="true">*</span> To ensure you receive relevant communications from Eviden relating to our events and offerings please opt-in. You can opt-out at any time.</p>
    <p class="contact-safekit-note">Your privacy is important to us. By submitting this form, you accept the terms in our <a href="https://eviden.com/privacy-policy/" rel="external">Privacy Policy</a>. Please read it to understand how we ensure your rights are upheld.</p>
    <button type="submit">Submit</button>
  </form>
</div>
<link rel="stylesheet" href="/css/contact-safekit.css?v=2">
<script src="/js/contact-safekit-query.js" defer></script>
