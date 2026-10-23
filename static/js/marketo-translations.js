const listOfEuropeanCountries = ["Aland Islands", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus",
"Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark",
"Estonia", "Faroe Islands", "Finland", "France", "Georgia", "Germany", "Greece", "Greenland", 
"Holy See (Vatican City State)", "Hungary", "Iceland", "Ireland", "Italy", "Japanese", "Latvia", "Liechtenstein", 
"Lithuania", "Luxembourg", "Malta", "Moldova", "Moldova, Republic of", "Monaco", "Montenegro",
"Netherlands", "North Macedonia", "Macedonia, the former Yugoslav Republic of", "Norway", "Poland",
 "Portugal", "Romania", "Russia", "Russian Federation", "San Marino", "Serbia", "Slovakia", "Slovenia",
  "Spain", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Turkey", "Ukraine"];

const catchFrenchLanguageCodes = (navLang) => {
    if (navLang.toLowerCase().includes("fr")) {
        return navLang;
    } else return false;
};
const catchLatAmSpanishLanguageCodes = (navLang) => {
    if (navLang.toLowerCase().includes("es") && navLang.toLowerCase() != "es" && navLang.toLowerCase() != "es-es") {
        return navLang;
    } else return false;
}

const catchGermanLanguageCodes = (navLang) => {
    if (navLang.toLowerCase().includes("de")) {
        return navLang;
    } else return false;
};

const languageTranslations = {
    "ZH-HANS": {
        "FirstName": { "type": "text", "label": "名字 *", "requiredError": "此字段为必填项" },
        "LastName": { "type": "text", "label": "姓氏 *", "requiredError": "此字段为必填项" },
        "Email": { "type": "email", "label": "工作电子邮箱 *", "requiredError": "请输入有效的电子邮箱地址" },
        "Phone": { "type": "telephone", "label": "工作电话 *", "requiredError": "请输入有效的电话号码" },
        "Company": { "type": "text", "label": "公司或组织名称 *", "requiredError": "此字段为必填项" },
        "Country": {
            "type": "select",
            "label": "国家或地区 *",
            "options": [
                { "value": "", "text": "请选择" },
                { "value": "Afghanistan", "text": "阿富汗" },
                { "value": "Aland Islands", "text": "奥兰群岛" },
                { "value": "Albania", "text": "阿尔巴尼亚" },
                { "value": "Algeria", "text": "阿尔及利亚" },
                { "value": "Andorra", "text": "安道尔" },
                { "value": "Angola", "text": "安哥拉" },
                { "value": "Anguilla", "text": "安圭拉" },
                { "value": "Antarctica", "text": "南极洲" },
                { "value": "Antigua and Barbuda", "text": "安提瓜和巴布达" },
                { "value": "Argentina", "text": "阿根廷" },
                { "value": "Armenia", "text": "亚美尼亚" },
                { "value": "Aruba", "text": "阿鲁巴" },
                { "value": "Australia", "text": "澳大利亚" },
                { "value": "Austria", "text": "奥地利" },
                { "value": "Azerbaijan", "text": "阿塞拜疆" },
                { "value": "Bahamas", "text": "巴哈马" },
                { "value": "Bahrain", "text": "巴林" },
                { "value": "Bangladesh", "text": "孟加拉国" },
                { "value": "Barbados", "text": "巴巴多斯" },
                { "value": "BelarusBelarus", "text": "白俄罗斯" },
                { "value": "Belgium", "text": "比利时" },
                { "value": "Belize", "text": "伯利兹" },
                { "value": "Benin", "text": "贝宁" },
                { "value": "Bermuda", "text": "百慕大" },
                { "value": "Bhutan", "text": "不丹" },
                { "value": "Bolivia, Plurinational State of", "text": "玻利维亚" },
                { "value": "Bonaire, Sint Eustatius and Saba", "text": "博奈尔、圣尤斯特歇斯和萨巴" },
                { "value": "Bosnia and Herzegovina", "text": "波斯尼亚和黑塞哥维那" },
                { "value": "Botswana", "text": "博茨瓦纳" },
                { "value": "Brazil", "text": "巴西" },
                { "value": "British Indian Ocean Territory", "text": "英属印度洋领地" },
                { "value": "British Virgin Islands", "text": "英属维尔京群岛" },
                { "value": "Brunei Darussalam", "text": "文莱" },
                { "value": "Bulgaria", "text": "保加利亚" },
                { "value": "Burkina Faso", "text": "布基纳法索" },
                { "value": "Burundi", "text": "布隆迪" },
                { "value": "Cambodia", "text": "柬埔寨" },
                { "value": "Cameroon", "text": "喀麦隆" },
                { "value": "Canada", "text": "加拿大" },
                { "value": "Cape Verde", "text": "佛得角" },
                { "value": "Cayman Islands", "text": "开曼群岛" },
                { "value": "Central African Republic", "text": "中非共和国" },
                { "value": "Chad", "text": "乍得" },
                { "value": "Chile", "text": "智利" },
                { "value": "China", "text": "中国" },
                { "value": "Christmas Island", "text": "圣诞岛" },
                { "value": "Cocos (Keeling) Islands", "text": "科科斯（基林）群岛" },
                { "value": "Colombia", "text": "哥伦比亚" },
                { "value": "Comoros", "text": "科摩罗" },
                { "value": "Congo", "text": "刚果共和国" },
                { "value": "Congo, the Democratic Republic of the", "text": "刚果民主共和国" },
                { "value": "Cook Islands", "text": "库克群岛" },
                { "value": "Costa Rica", "text": "哥斯达黎加" },
                { "value": "Cote d'Ivoire", "text": "科特迪瓦" },
                { "value": "Crimea Region", "text": "克里米亚地区" },
                { "value": "Croatia", "text": "克罗地亚" },
                { "value": "Cuba", "text": "古巴" },
                { "value": "Curaçao", "text": "库拉索" },
                { "value": "Cyprus", "text": "塞浦路斯" },
                { "value": "Czech Republic", "text": "捷克" },
                { "value": "Denmark", "text": "丹麦" },
                { "value": "Djibouti", "text": "吉布提" },
                { "value": "Dominica", "text": "多米尼克" },
                { "value": "Dominican Republic", "text": "多米尼加共和国" },
                { "value": "Ecuador", "text": "厄瓜多尔" },
                { "value": "Egypt", "text": "埃及" },
                { "value": "El Salvador", "text": "萨尔瓦多" },
                { "value": "Equatorial Guinea", "text": "赤道几内亚" },
                { "value": "Eritrea", "text": "厄立特里亚" },
                { "value": "Estonia", "text": "爱沙尼亚" },
                { "value": "Ethiopia", "text": "埃塞俄比亚" },
                { "value": "Falkland Islands (Malvinas)", "text": "福克兰群岛（马尔维纳斯群岛）" },
                { "value": "Faroe Islands", "text": "法罗群岛" },
                { "value": "Fiji", "text": "斐济" },
                { "value": "Finland", "text": "芬兰" },
                { "value": "France", "text": "法国" },
                { "value": "French Guiana", "text": "法属圭亚那" },
                { "value": "French Polynesia", "text": "法属波利尼西亚" },
                { "value": "French Southern Territories", "text": "法属南部领地" },
                { "value": "Gabon", "text": "加蓬" },
                { "value": "Gambia", "text": "冈比亚" },
                { "value": "Georgia", "text": "格鲁吉亚" },
                { "value": "Germany", "text": "德国" },
                { "value": "Ghana", "text": "加纳" },
                { "value": "Gibraltar", "text": "直布罗陀" },
                { "value": "Greece", "text": "希腊" },
                { "value": "Greenland", "text": "格陵兰" },
                { "value": "Grenada", "text": "格林纳达" },
                { "value": "Guadeloupe", "text": "瓜德罗普" },
                { "value": "Guam", "text": "关岛" },
                { "value": "Guatemala", "text": "危地马拉" },
                { "value": "Guernsey", "text": "根西岛" },
                { "value": "Guinea", "text": "几内亚" },
                { "value": "Guinea-Bissau", "text": "几内亚比绍" },
                { "value": "Guyana", "text": "圭亚那" },
                { "value": "Haiti", "text": "海地" },
                { "value": "Heard Island and McDonald Islands", "text": "赫德岛和麦克唐纳群岛" },
                { "value": "Holy See (Vatican City State)", "text": "梵蒂冈" },
                { "value": "Honduras", "text": "洪都拉斯" },
                { "value": "Hong Kong S.A.R., China", "text": "中国香港特别行政区" },
                { "value": "Hungary", "text": "匈牙利" },
                { "value": "Iceland", "text": "冰岛" },
                { "value": "India", "text": "印度" },
                { "value": "Indonesia", "text": "印度尼西亚" },
                { "value": "Iran, Islamic Republic of", "text": "伊朗" },
                { "value": "Iraq", "text": "伊拉克" },
                { "value": "Ireland", "text": "爱尔兰" },
                { "value": "Isle of Man", "text": "马恩岛" },
                { "value": "Israel", "text": "以色列" },
                { "value": "Italy", "text": "意大利" },
                { "value": "Jamaica", "text": "牙买加" },
                { "value": "Japan", "text": "日本" },
                { "value": "Jersey", "text": "泽西岛" },
                { "value": "Jordan", "text": "约旦" },
                { "value": "Kazakhstan", "text": "哈萨克斯坦" },
                { "value": "Kenya", "text": "肯尼亚" },
                { "value": "Kiribati", "text": "基里巴斯" },
                { "value": "Korea, Democratic People's Republic of", "text": "朝鲜" },
                { "value": "Korea, Republic of", "text": "韩国" },
                { "value": "Kuwait", "text": "科威特" },
                { "value": "Kyrgyzstan", "text": "吉尔吉斯斯坦" },
                { "value": "Lao People's Democratic Republic", "text": "老挝" },
                { "value": "Latvia", "text": "拉脱维亚" },
                { "value": "Lebanon", "text": "黎巴嫩" },
                { "value": "Lesotho", "text": "莱索托" },
                { "value": "Liberia", "text": "利比里亚" },
                { "value": "Libyan Arab Jamahiriya", "text": "利比亚" },
                { "value": "Liechtenstein", "text": "列支敦士登" },
                { "value": "Lithuania", "text": "立陶宛" },
                { "value": "Luxembourg", "text": "卢森堡" },
                { "value": "Macao S.A.R., China", "text": "中国澳门特别行政区" },
                { "value": "Macedonia, the former Yugoslav Republic of", "text": "北马其顿" },
                { "value": "Madagascar", "text": "马达加斯加" },
                { "value": "Malawi", "text": "马拉维" },
                { "value": "Malaysia", "text": "马来西亚" },
                { "value": "Maldives", "text": "马尔代夫" },
                { "value": "Mali", "text": "马里" },
                { "value": "Malta", "text": "马耳他" },
                { "value": "Marshall Islands", "text": "马绍尔群岛" },
                { "value": "Martinique", "text": "马提尼克" },
                { "value": "Mauritania", "text": "毛里塔尼亚" },
                { "value": "Mauritius", "text": "毛里求斯" },
                { "value": "Mayotte", "text": "马约特" },
                { "value": "Mexico", "text": "墨西哥" },
                { "value": "Micronesia, Federated States of", "text": "密克罗尼西亚联邦" },
                { "value": "Moldova, Republic of", "text": "摩尔多瓦" },
                { "value": "Monaco", "text": "摩纳哥" },
                { "value": "Mongolia", "text": "蒙古" },
                { "value": "Montenegro", "text": "黑山" },
                { "value": "Montserrat", "text": "蒙特塞拉特" },
                { "value": "Morocco", "text": "摩洛哥" },
                { "value": "Mozambique", "text": "莫桑比克" },
                { "value": "Myanmar", "text": "缅甸" },
                { "value": "N.Mariana Islnd", "text": "北马里亚纳群岛" },
                { "value": "Namibia", "text": "纳米比亚" },
                { "value": "Nauru", "text": "瑙鲁" },
                { "value": "Nepal", "text": "尼泊尔" },
                { "value": "Netherlands", "text": "荷兰" },
                { "value": "Netherlands Antilles", "text": "荷属安的列斯群岛" },
                { "value": "New Caledonia", "text": "新喀里多尼亚" },
                { "value": "New Zealand", "text": "新西兰" },
                { "value": "Nicaragua", "text": "尼加拉瓜" },
                { "value": "Niger", "text": "尼日尔" },
                { "value": "Nigeria", "text": "尼日利亚" },
                { "value": "Niue", "text": "纽埃" },
                { "value": "Norfolk Island", "text": "诺福克岛" },
                { "value": "North Korea", "text": "朝鲜" },
                { "value": "Norway", "text": "挪威" },
                { "value": "Oman", "text": "阿曼" },
                { "value": "Pakistan", "text": "巴基斯坦" },
                { "value": "Palau", "text": "帕劳" },
                { "value": "Palestinian Territory, Occupied", "text": "巴勒斯坦被占领土" },
                { "value": "Panama", "text": "巴拿马" },
                { "value": "Papua New Guinea", "text": "巴布亚新几内亚" },
                { "value": "Paraguay", "text": "巴拉圭" },
                { "value": "Peru", "text": "秘鲁" },
                { "value": "Philippines", "text": "菲律宾" },
                { "value": "Pitcairn", "text": "皮特凯恩群岛" },
                { "value": "Poland", "text": "波兰" },
                { "value": "Portugal", "text": "葡萄牙" },
                { "value": "Puerto Rico", "text": "波多黎各" },
                { "value": "Qatar", "text": "卡塔尔" },
                { "value": "Reunion", "text": "留尼汪" },
                { "value": "Romania", "text": "罗马尼亚" },
                { "value": "Russian Federation", "text": "俄罗斯" },
                { "value": "Rwanda", "text": "卢旺达" },
                { "value": "Saint Barthélemy", "text": "圣巴泰勒米" },
                { "value": "Saint Helena, Ascension and Tristan da Cunha", "text": "圣赫勒拿、阿森松和特里斯坦达库尼亚" },
                { "value": "Saint Kitts and Nevis", "text": "圣基茨和尼维斯" },
                { "value": "Saint Lucia", "text": "圣卢西亚" },
                { "value": "Saint Martin (French part)", "text": "法属圣马丁" },
                { "value": "Saint Pierre and Miquelon", "text": "圣皮埃尔和密克隆" },
                { "value": "Saint Vincent and the Grenadines", "text": "圣文森特和格林纳丁斯" },
                { "value": "Samoa", "text": "萨摩亚" },
                { "value": "Samoa, American", "text": "美属萨摩亚" },
                { "value": "San Marino", "text": "圣马力诺" },
                { "value": "Sao Tome and Principe", "text": "圣多美和普林西比" },
                { "value": "Saudi Arabia", "text": "沙特阿拉伯" },
                { "value": "Senegal", "text": "塞内加尔" },
                { "value": "Serbia", "text": "塞尔维亚" },
                { "value": "Seychelles", "text": "塞舌尔" },
                { "value": "Sierra Leone", "text": "塞拉利昂" },
                { "value": "Singapore", "text": "新加坡" },
                { "value": "Sint Maarten (Dutch part)", "text": "荷属圣马丁" },
                { "value": "Slovakia", "text": "斯洛伐克" },
                { "value": "Slovenia", "text": "斯洛文尼亚" },
                { "value": "Solomon Islands", "text": "所罗门群岛" },
                { "value": "Somalia", "text": "索马里" },
                { "value": "South Africa", "text": "南非" },
                { "value": "South Georgia and the South Sandwich Islands", "text": "南乔治亚和南桑威奇群岛" },
                { "value": "South Sudan", "text": "南苏丹" },
                { "value": "Spain", "text": "西班牙" },
                { "value": "Sri Lanka", "text": "斯里兰卡" },
                { "value": "Sudan", "text": "苏丹" },
                { "value": "Suriname", "text": "苏里南" },
                { "value": "Svalbard and Jan Mayen", "text": "斯瓦尔巴和扬马延" },
                { "value": "Swaziland", "text": "斯威士兰" },
                { "value": "Sweden", "text": "瑞典" },
                { "value": "Switzerland", "text": "瑞士" },
                { "value": "Syrian Arab Republic", "text": "叙利亚" },
                { "value": "Taiwan", "text": "台湾" },
                { "value": "Tajikistan", "text": "塔吉克斯坦" },
                { "value": "Tanzania, United Republic of", "text": "坦桑尼亚" },
                { "value": "Thailand", "text": "泰国" },
                { "value": "Timor-Leste", "text": "东帝汶" },
                { "value": "Togo", "text": "多哥" },
                { "value": "Tokelau", "text": "托克劳" },
                { "value": "Tonga", "text": "汤加" },
                { "value": "Trinidad and Tobago", "text": "特立尼达和多巴哥" },
                { "value": "Tunisia", "text": "突尼斯" },
                { "value": "Turkey", "text": "土耳其" },
                { "value": "Turkmenistan", "text": "土库曼斯坦" },
                { "value": "Turks and Caicos Islands", "text": "特克斯和凯科斯群岛" },
                { "value": "Tuvalu", "text": "图瓦卢" },
                { "value": "Uganda", "text": "乌干达" },
                { "value": "Ukraine", "text": "乌克兰" },
                { "value": "United Arab Emirates", "text": "阿拉伯联合酋长国" },
                { "value": "United Kingdom", "text": "英国" },
                { "value": "United States", "text": "美国" },
                { "value": "Uruguay", "text": "乌拉圭" },
                { "value": "US Minor Outl.Isl.", "text": "美国本土外小岛屿" },
                { "value": "Uzbekistan", "text": "乌兹别克斯坦" },
                { "value": "Vanuatu", "text": "瓦努阿图" },
                { "value": "Venezuela, Bolivarian Republic of", "text": "委内瑞拉" },
                { "value": "Vietnam", "text": "越南" },
                { "value": "Virgin Islands, British", "text": "英属维尔京群岛" },
                { "value": "Virgin Islands, US", "text": "美属维尔京群岛" },
                { "value": "Wallis and Futuna", "text": "瓦利斯和富图纳" },
                { "value": "Western Sahara", "text": "西撒哈拉" },
                { "value": "Yemen", "text": "也门" },
                { "value": "Zambia", "text": "赞比亚" },
                { "value": "Zimbabwe", "text": "津巴布韦" }
            ],
            "requiredError": "请选择国家或地区"
        },
        "SF_Job_Title__c": { "type": "text", "label": "职位名称" },
        "interestedIn": {
            "type": "select",
            "label": "您感兴趣的产品 *",
            "options": [
                { "value": "", "text": "请选择" },
                { "value": "IAM solution", "text": "身份与访问管理（IAM）解决方案" },
                { "value": "SSO Single Sign-on", "text": "单点登录（SSO）" },
                { "value": "Strong Authentication Management", "text": "强身份验证管理" },
                { "value": "Identity Governance and Administration", "text": "身份治理与管理" },
                { "value": "Web Access Manager", "text": "Web 访问管理" },
                { "value": "Identity As-a-Service", "text": "Orbion（身份即服务）" },
                { "value": "High Availability", "text": "高可用性（SafeKit）" },
                { "value": "Identity Analytics Intelligence", "text": "身份智能分析" },
                { "value": "DirX", "text": "DirX" },
                { "value": "Other", "text": "其他" }
            ],
            "requiredError": "请选择您感兴趣的产品"
        },
        "enquiryType": {
            "type": "select",
            "label": "咨询类型 *",
            "options": [
                { "value": "", "text": "请选择" },
                { "value": "Product Information", "text": "产品信息" },
                { "value": "Price Quote", "text": "报价" },
                { "value": "Demo", "text": "产品演示" },
                { "value": "Free trial package", "text": "免费试用" },
                { "value": "Free trial license", "text": "概念验证（POC）" },
                { "value": "Training & Certification", "text": "培训与认证" },
                { "value": "New Solution or Services for Your Business", "text": "适合您企业的新解决方案或服务" },
                { "value": "Product/Customer Support (current Eviden clients only)", "text": "产品与客户支持（仅限现有 Eviden 客户）" },
                { "value": "Accounting, Billing or Payments", "text": "会计、账单或付款" },
                { "value": "Job Information", "text": "招聘信息" },
                { "value": "Press Inquiry", "text": "媒体咨询" },
                { "value": "Selling to Eviden", "text": "向 Eviden 提供产品或服务" },
                { "value": "Alliance/Partnership Matters", "text": "联盟与合作事宜" },
                { "value": "Other", "text": "其他" }
            ],
            "requiredError": "请选择咨询类型"
        },
        "enquiry": { "type": "text", "label": "咨询内容" },
        "Opt_in__c": {
            "type": "radio",
            "label": "同意接收信息 *",
            "options": [
                { "value": "yes", "text": "是" },
                { "value": "no", "text": "否" }
            ],
            "requiredError": "请选择是否同意接收信息"
        },
        "PrivacyText": [
            { "value": "GDPR", "text": "我们重视您的隐私。您所在的国家或地区根据 GDPR 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "DPA", "text": "我们重视您的隐私。您所在的国家或地区根据 DPA 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "CCPA", "text": "我们重视您的隐私。您所在的国家或地区根据 CCPA/CPRA 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "CASL", "text": "我们重视您的隐私。您所在的国家或地区根据 CASL 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "LGDP", "text": "我们重视您的隐私。您所在的国家或地区根据 LGPD 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "POPIA", "text": "我们重视您的隐私。您所在的国家或地区根据 POPIA 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "LFPDPPP", "text": "我们重视您的隐私。您所在的国家或地区根据 LFPDPPP 赋予您相关权利。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利，以及如何在您希望时删除您的数据。" },
            { "value": "none", "text": "我们重视您的隐私。提交此表单即表示您接受我们隐私政策中的条款。请阅读该政策，了解我们如何保障您的权利。" }
        ],
        "OptInText": [
            { "value": "GDPRandDefault", "text": "*为确保您收到有关 Eviden 活动和产品服务的相关信息，请选择同意接收。您可以随时取消订阅。" },
            { "value": "CCPA", "text": "在此表单中提供您的信息，即表示您同意我们按照隐私政策向您发送有关 Eviden 活动和产品服务的信息。您可以随时取消订阅。" }
        ],
        "Submit": { "type": "submit", "text": "提交" },
        "ThankYouEmptyDataContent": "感谢您的关注。",
        "ThankYouDataContent": "感谢您关注",
        "DownloadLinkText": "您可以在此下载报告。",
        "ContactTYText": "我们的团队成员将尽快与您联系。"
    },
    "Japanese": {
        "preferredLanguage" : {
            "type": "select",
            "label": "言語 ",
            "options": [
                {
                    "value": "",
                    "text": "お選びください "
                   },
                   {
                    "value": "English GB",
                    "text": "英語（英国） "
                   },
                   {
                    "value": "English US",
                    "text": "英語（米国） "
                   },
                   {
                    "value": "French",
                    "text": "フランス語 "
                   },
                   {
                    "value": "Italian",
                    "text": "イタリア語 "
                   },
                   {
                    "value": "German",
                    "text": "ドイツ語 "
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "南アメリカスペイン語　"
                   },
                   {
                    "value": "European Spanish",
                    "text": "スペイン語 "
                   },
                   {
                    "value": "Dutch",
                    "text": "オランダ語 "
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "ブラジルポルトガル語 "
                   },
                   {
                    "value": "Japanese",
                    "text": "日本語"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "敬礼 ",
            "options": [
                {
                    "value": "",
                    "text": "選んでください "
                },
                {
                    "value": "Mr.",
                    "text": "氏 "
                },
                {
                    "value": "Mrs.",
                    "text": "夫人 "
                },
                {
                    "value": "Ms.",
                    "text": "MS。 "
                },
                {
                    "value": "Miss.",
                    "text": "逃す。 "
                },                
                {
                    "value": "Mx.",
                    "text": "Mx。 "
                },                
                {
                    "value": "Master",
                    "text": "マスター "
                },                
                {
                    "value": "Sir",
                    "text": "様 "
                },                
                {
                    "value": "Dr.",
                    "text": "博士 "
                },
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "姓 * ",
            "requiredError": "この項目は必須です ",
            },
        "LastName": {
            "type": "text",
            "label": "名 * ",
            "requiredError": "この項目は必須です ",
            },        
        "Email" : {
            "type": "email",
            "label": "メールアドレス *",
            "requiredError": "有効なメールアドレスを入力してください ",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "業界 * ",
            "options": [
                {
                    "value": "",
                    "text": "お選びください "
                   },
                   {
                    "value": "Accounting",
                    "text": "会計 "
                   },
                   {
                    "value": "Airlines/Aviation",
                    "text": "航空会社・航空 "
                   },
                   {
                    "value": "Alternative Dispute Resolution",
                    "text": "裁判外紛争解決 "
                   },
                   {
                    "value": "Alternative Medicine",
                    "text": "代替医療 "
                   },
                   {
                    "value": "Animation",
                    "text": "アニメーション "
                   },
                   {
                    "value": "Apparel & Fashion",
                    "text": "アパレル＆ファッション "
                   },
                   {
                    "value": "Architecture & Planning",
                    "text": "建築・計画 "
                   },
                   {
                    "value": "Arts and Crafts",
                    "text": "美術工芸 "
                   },
                   {
                    "value": "Automotive",
                    "text": "自動車 "
                   },
                   {
                    "value": "Aviation & Aerospace",
                    "text": "航空・航空宇宙 "
                   },
                   {
                    "value": "Banking",
                    "text": "銀行 "
                   },
                   {
                    "value": "Biotechnology",
                    "text": "バイオテクノロジー "
                   },
                   {
                    "value": "Broadcast Media",
                    "text": "マスコミ "
                   },
                   {
                    "value": "Building Materials",
                    "text": "建材 "
                   },
                   {
                    "value": "Business Supplies and Equipment",
                    "text": "ビジネス用品・機器 "
                   },
                   {
                    "value": "Capital Markets",
                    "text": "資本市場 "
                   },
                   {
                    "value": "Chemicals",
                    "text": "化学薬品 "
                   },
                   {
                    "value": "Civic & Social Organisation",
                    "text": "市民社会組織 "
                   },
                   {
                    "value": "Civil Engineering",
                    "text": "土木工学 "
                   },
                   {
                    "value": "Commercial Real Estate",
                    "text": "商業不動産 "
                   },
                   {
                    "value": "Computer & Network Security",
                    "text": "コンピュータとネットワークのセキュリティ "
                   },
                   {
                    "value": "Computer Games",
                    "text": "コンピューターゲーム "
                   },
                   {
                    "value": "Computer Hardware",
                    "text": "コンピューターハードウェア "
                   },
                   {
                    "value": "Computer Networking",
                    "text": "コンピューターネットワーキング "
                   },
                   {
                    "value": "Computer Software",
                    "text": "コンピューターソフトウェア "
                   },
                   {
                    "value": "Construction",
                    "text": "工事 "
                   },
                   {
                    "value": "Consumer Electronics",
                    "text": "家電 "
                   },
                   {
                    "value": "Consumer Goods",
                    "text": "消費財 "
                   },
                   {
                    "value": "Consumer Services",
                    "text": "消費者サービス "
                   },
                   {
                    "value": "Cosmetics",
                    "text": "化粧品 "
                   },
                   {
                    "value": "Dairy",
                    "text": "乳製品 "
                   },
                   {
                    "value": "Defence & Space",
                    "text": "防衛・宇宙 "
                   },
                   {
                    "value": "Design",
                    "text": "設計 "
                   },
                   {
                    "value": "Education Management",
                    "text": "教育管理 "
                   },
                   {
                    "value": "E-Learning",
                    "text": "Eラーニング "
                   },
                   {
                    "value": "Electrical/Electronic Manufacturing",
                    "text": "電気・電子製造 "
                   },
                   {
                    "value": "Entertainment",
                    "text": "エンターテイメント "
                   },
                   {
                    "value": "Environmental Services",
                    "text": "環境サービス "
                   },
                   {
                    "value": "Events Services",
                    "text": "イベントサービス "
                   },
                   {
                    "value": "Executive Office",
                    "text": "事務局 "
                   },
                   {
                    "value": "Facilities Services",
                    "text": "施設サービス "
                   },
                   {
                    "value": "Farming",
                    "text": "農業 "
                   },
                   {
                    "value": "Financial Services",
                    "text": "金融業務 "
                   },
                   {
                    "value": "Fine Art",
                    "text": "美術 "
                   },
                   {
                    "value": "Fishery",
                    "text": "水産 "
                   },
                   {
                    "value": "Food & Beverages",
                    "text": "飲食 "
                   },
                   {
                    "value": "Food Production",
                    "text": "食糧の生産 "
                   },
                   {
                    "value": "Fund-Raising",
                    "text": "資金調達 "
                   },
                   {
                    "value": "Furniture",
                    "text": "家具 "
                   },
                   {
                    "value": "Gambling & Casinos",
                    "text": "ギャンブル・カジノ "
                   },
                   {
                    "value": "Glass, Ceramics & Concrete",
                    "text": "ガラス・セラミック・コンクリート "
                   },
                   {
                    "value": "Government Administration",
                    "text": "政府の管理 "
                   },
                   {
                    "value": "Government Relations",
                    "text": "政府関係 "
                   },
                   {
                    "value": "Graphic Design",
                    "text": "グラフィックデザイン "
                   },
                   {
                    "value": "Health, Wellness and Fitness",
                    "text": "健康・ウェルネス・フィットネス "
                   },
                   {
                    "value": "Higher Education",
                    "text": "高等教育 "
                   },
                   {
                    "value": "Hospital & Health Care",
                    "text": "病院・ヘルスケア "
                   },
                   {
                    "value": "Hospitality",
                    "text": "ホスピタリティ "
                   },
                   {
                    "value": "Human Resources",
                    "text": "人事 "
                   },
                   {
                    "value": "Import and Export",
                    "text": "輸出輸入 "
                   },
                   {
                    "value": "Individual & Family Services",
                    "text": "個人および家族向けサービス "
                   },
                   {
                    "value": "Industrial Automation",
                    "text": "産業自動化 "
                   },
                   {
                    "value": "Information Services",
                    "text": "情報サービス "
                   },
                   {
                    "value": "Information Technology and Services",
                    "text": "情報技術およびサービス "
                   },
                   {
                    "value": "Insurance",
                    "text": "保険 "
                   },
                   {
                    "value": "International Affairs",
                    "text": "国際情勢 "
                   },
                   {
                    "value": "International Trade and Development",
                    "text": "国際貿易・発展 "
                   },
                   {
                    "value": "Internet",
                    "text": "インターネット "
                   },
                   {
                    "value": "Investment Banking",
                    "text": "投資銀行 "
                   },
                   {
                    "value": "Investment Management",
                    "text": "投資管理 "
                   },
                   {
                    "value": "Judiciary",
                    "text": "司法 "
                   },
                   {
                    "value": "Law Enforcement",
                    "text": "法執行機関 "
                   },
                   {
                    "value": "Law Practice",
                    "text": "法務 "
                   },
                   {
                    "value": "Legal Services",
                    "text": "法律サービス "
                   },
                   {
                    "value": "Legislative Office",
                    "text": "立法府 "
                   },
                   {
                    "value": "Leisure, Travel & Tourism",
                    "text": "レジャー・旅行・観光 "
                   },
                   {
                    "value": "Libraries",
                    "text": "図書館 "
                   },
                   {
                    "value": "Logistics and Supply Chain",
                    "text": "ロジスティクスとサプライチェーン "
                   },
                   {
                    "value": "Luxury Goods & Jewellery",
                    "text": "高級品・ジュエリー "
                   },
                   {
                    "value": "Machinery",
                    "text": "機械 "
                   },
                   {
                    "value": "Management Consulting",
                    "text": "経営コンサルティング "
                   },
                   {
                    "value": "Maritime",
                    "text": "海事産業 "
                   },
                   {
                    "value": "Market Research",
                    "text": "市場調査 "
                   },
                   {
                    "value": "Marketing and Advertising",
                    "text": "マーケティング・広告 "
                   },
                   {
                    "value": "Mechanical or Industrial Engineering",
                    "text": "機械工学または工業工学 "
                   },
                   {
                    "value": "Media Production",
                    "text": "メディア制作 "
                   },
                   {
                    "value": "Medical Devices",
                    "text": "医療機器 "
                   },
                   {
                    "value": "Medical Practice",
                    "text": "医療実技 "
                   },
                   {
                    "value": "Mental Health Care",
                    "text": "メンタルヘルスケア "
                   },
                   {
                    "value": "Military",
                    "text": "軍隊 "
                   },
                   {
                    "value": "Mining & Metals",
                    "text": "鉱業および金属 "
                   },
                   {
                    "value": "Mobile Games",
                    "text": "モバイルゲーム "
                   },
                   {
                    "value": "Motion Pictures and Film",
                    "text": "映画・アニメーション "
                   },
                   {
                    "value": "Museums and Institutions",
                    "text": "美術館・機関 "
                   },
                   {
                    "value": "Music",
                    "text": "音楽 "
                   },
                   {
                    "value": "Nanotechnology",
                    "text": "ナノテクノロジー "
                   },
                   {
                    "value": "Newspapers",
                    "text": "新聞 "
                   },
                   {
                    "value": "Non-Profit Organisation Management",
                    "text": "非営利組織の管理 "
                   },
                   {
                    "value": "Oil & Energy",
                    "text": "石油・エネルギー "
                   },
                   {
                    "value": "Online Media",
                    "text": "オンラインメディア "
                   },
                   {
                    "value": "Other",
                    "text": "その他 "
                   },
                   {
                    "value": "Outsourcing/Offshoring",
                    "text": "アウトソーシング・オフショアリング "
                   },
                   {
                    "value": "Package/Freight Delivery",
                    "text": "パッケージ・貨物配送 "
                   },
                   {
                    "value": "Packaging and Containers",
                    "text": "包装・容器 "
                   },
                   {
                    "value": "Paper & Forest Products",
                    "text": "紙・林産物 "
                   },
                   {
                    "value": "Performing Arts",
                    "text": "舞台芸術 "
                   },
                   {
                    "value": "Pharmaceuticals",
                    "text": "医薬品 "
                   },
                   {
                    "value": "Philanthropy",
                    "text": "慈善活動 "
                   },
                   {
                    "value": "Photography",
                    "text": "写真撮影 "
                   },
                   {
                    "value": "Plastics",
                    "text": "プラスチック "
                   },
                   {
                    "value": "Political Organisation",
                    "text": "政治組織 "
                   },
                   {
                    "value": "Primary/Secondary Education",
                    "text": "初等・中等教育 "
                   },
                   {
                    "value": "Printing",
                    "text": "印刷 "
                   },
                   {
                    "value": "Professional Training & Coaching",
                    "text": "専門的なトレーニング・コーチング "
                   },
                   {
                    "value": "Program Development",
                    "text": "プログラム開発 "
                   },
                   {
                    "value": "Public Policy",
                    "text": "公共政策 "
                   },
                   {
                    "value": "Public Relations and Communications",
                    "text": "広報とコミュニケーション "
                   },
                   {
                    "value": "Public Safety",
                    "text": "公安 "
                   },
                   {
                    "value": "Publishing",
                    "text": "出版 "
                   },
                   {
                    "value": "Railroad Manufacture",
                    "text": "鉄道製造 "
                   },
                   {
                    "value": "Ranching",
                    "text": "牧場 "
                   },
                   {
                    "value": "Real Estate",
                    "text": "不動産 "
                   },
                   {
                    "value": "Recreational Facilities and Services",
                    "text": "レジャー施設とサービス "
                   },
                   {
                    "value": "Religious Institutions",
                    "text": "宗教団体 "
                   },
                   {
                    "value": "Renewables & Environment",
                    "text": "再生可能エネルギー・環境 "
                   },
                   {
                    "value": "Research",
                    "text": "研究 "
                   },
                   {
                    "value": "Restaurants",
                    "text": "レストラン "
                   },
                   {
                    "value": "Retail",
                    "text": "小売り "
                   },
                   {
                    "value": "Security and Investigations",
                    "text": "セキュリティ・調査 "
                   },
                   {
                    "value": "Semiconductors",
                    "text": "半導体 "
                   },
                   {
                    "value": "Shipbuilding",
                    "text": "造船 "
                   },
                   {
                    "value": "Sporting Goods",
                    "text": "スポーツ用品 "
                   },
                   {
                    "value": "Sports",
                    "text": "スポーツ "
                   },
                   {
                    "value": "Staffing and Recruiting",
                    "text": "人員配置・採用 "
                   },
                   {
                    "value": "Supermarkets",
                    "text": "スーパーマーケット "
                   },
                   {
                    "value": "Telecommunications",
                    "text": "電気通信 "
                   },
                   {
                    "value": "Textiles",
                    "text": "繊維 "
                   },
                   {
                    "value": "Think Tanks",
                    "text": "シンクタンク "
                   },
                   {
                    "value": "Tobacco",
                    "text": "タバコ "
                   },
                   {
                    "value": "Translation and Localisation",
                    "text": "翻訳・ローカリゼーション "
                   },
                   {
                    "value": "Transportation/Trucking/Railroad",
                    "text": "輸送・トラック・鉄道 "
                   },
                   {
                    "value": "Utilities",
                    "text": "ユーティリティ "
                   },
                   {
                    "value": "Venture Capital & Private Equity",
                    "text": "ベンチャーキャピタルとプライベートエクイティ "
                   },
                   {
                    "value": "Veterinary",
                    "text": "獣医 "
                   },
                   {
                    "value": "Warehousing",
                    "text": "倉庫保管 "
                   },
                   {
                    "value": "Wholesale",
                    "text": "卸売 "
                   },
                   {
                    "value": "Wine and Spirits",
                    "text": "ワイン・スピリッツ "
                   },
                   {
                    "value": "Wireless",
                    "text": "無線 "
                   },
                   {
                    "value": "Writing and Editing",
                    "text": "執筆・編集 "
                   }
            ],
            "requiredError": "このフィールドの値を選択してください ",
        },
        "Phone" : {
            "type": "telephone",
            "label": "電話番号 * ",
            "requiredError": "有効な電話番号を入力してください ",
        },
        "Company" : {
            "type": "text",
            "label": "会社名 * ",
            "requiredError": "この項目は必須です ",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "会社の収益 ",
            "options": [
                {
                    "value": "",
                    "text": "お選びください "
                },
                {
                    "value": "Smaller than $200mil",
                    "text": "2億ドル未満 "
                },
                {
                    "value": "$201mil to $500mil",
                    "text": "2億100万ドルから5億ドル "
                },
                {
                    "value": "$501mil to $1bil",
                    "text": "5億100万ドルから10億ドル "
                },
                {
                    "value": "Greater than $1bil",
                    "text": "10億ドルを超える "
                },
            ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "会社の規模 ",
            "options": [
                {
                    "value": "",
                    "text": "お選びください "
                },
                {
                    "value": "Smaller than 3,000 Employees",
                    "text": "3,000人未満の従業員 "
                },
                {
                    "value": "3,001 to 5,000 Employees",
                    "text": "3,001〜5,000人の従業員 "
                },
                {
                    "value": "5,001 to 10,000 Employees",
                    "text": "5,001〜10,000人の従業員 "
                },
                {
                    "value": "Greater than 10,001 Employees",
                    "text": "10,001人以上の従業員 "
                },
            ]
        },
        "Country": {
            "type": "select",
            "label": "国 * ",
            "options": [
                {
                 "value": "",
                 "text": "お選びください "
                },
                {
                 "value": "Afghanistan",
                 "text": "アフガニスタン "
                },
                {
                 "value": "Aland Islands",
                 "text": "オーランド諸島 "
                },
                {
                 "value": "Albania",
                 "text": "アルバニア "
                },
                {
                 "value": "Algeria",
                 "text": "アルジェリア "
                },
                {
                 "value": "Andorra",
                 "text": "アンドラ "
                },
                {
                 "value": "Angola",
                 "text": "アンゴラ "
                },
                {
                 "value": "Anguilla",
                 "text": "アンギラ "
                },
                {
                 "value": "Antarctica",
                 "text": "南極大陸 "
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "アンティグアバーブーダ "
                },
                {
                 "value": "Argentina",
                 "text": "アルゼンチン "
                },
                {
                 "value": "Armenia",
                 "text": "アルメニア "
                },
                {
                 "value": "Aruba",
                 "text": "アルバ "
                },
                {
                 "value": "Australia",
                 "text": "オーストラリア "
                },
                {
                 "value": "Austria",
                 "text": "オーストリア "
                },
                {
                 "value": "Azerbaijan",
                 "text": "アゼルバイジャン "
                },
                {
                 "value": "Bahamas",
                 "text": "バハマ "
                },
                {
                 "value": "Bahrain",
                 "text": "バーレーン "
                },
                {
                 "value": "Bangladesh",
                 "text": "バングラデシュ "
                },
                {
                 "value": "Barbados",
                 "text": "バルバドス "
                },
                {
                 "value": "BelarusBelarus",
                 "text": "ベラルーシ "
                },
                {
                 "value": "Belgium",
                 "text": "ベルギー "
                },
                {
                 "value": "Belize",
                 "text": "ベリーズ "
                },
                {
                 "value": "Benin",
                 "text": "ベナン "
                },
                {
                 "value": "Bermuda",
                 "text": "バミューダ "
                },
                {
                 "value": "Bhutan",
                 "text": "ブータン "
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "ボリビア多民族国 "
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "ボネール、シント・ユースタティウス、サバ "
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "ボスニア・ヘルツェゴビナ "
                },
                {
                 "value": "Botswana",
                 "text": "ボツワナ "
                },
                {
                 "value": "Brazil",
                 "text": "ブラジル "
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "イギリス領インド洋地域 "
                },
                {
                 "value": "British Virgin Islands",
                 "text": "イギリス領ヴァージン諸島 "
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "ブルネイダルサラーム "
                },
                {
                 "value": "Bulgaria",
                 "text": "ブルガリア "
                },
                {
                 "value": "Burkina Faso",
                 "text": "ブルキナファソ "
                },
                {
                 "value": "Burundi",
                 "text": "ブルンジ "
                },
                {
                 "value": "Cambodia",
                 "text": "カンボジア "
                },
                {
                 "value": "Cameroon",
                 "text": "カメルーン "
                },
                {
                 "value": "Canada",
                 "text": "カナダ "
                },
                {
                 "value": "Cape Verde",
                 "text": "カーボベルデ "
                },
                {
                 "value": "Cayman Islands",
                 "text": "ケイマン諸島 "
                },
                {
                 "value": "Central African Republic",
                 "text": "中央アフリカ共和国 "
                },
                {
                 "value": "Chad",
                 "text": "チャド "
                },
                {
                 "value": "Chile",
                 "text": "チリ "
                },
                {
                 "value": "China",
                 "text": "中国 "
                },
                {
                 "value": "Christmas Island",
                 "text": "クリスマス島 "
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "ココス（キーリング）諸島 "
                },
                {
                 "value": "Colombia",
                 "text": "コロンビア "
                },
                {
                 "value": "Comoros",
                 "text": "コモロ "
                },
                {
                 "value": "Congo",
                 "text": "コンゴ "
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "コンゴ民主共和国 "
                },
                {
                 "value": "Cook Islands",
                 "text": "クック諸島 "
                },
                {
                 "value": "Costa Rica",
                 "text": "コスタリカ "
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "コートジボワール "
                },
                {
                 "value": "Crimea Region",
                 "text": "クリミア地域 "
                },
                {
                 "value": "Croatia",
                 "text": "クロアチア "
                },
                {
                 "value": "Cuba",
                 "text": "キューバ "
                },
                {
                 "value": "Curaçao",
                 "text": "キュラソー "
                },
                {
                 "value": "Cyprus",
                 "text": "キプロス "
                },
                {
                 "value": "Czech Republic",
                 "text": "チェコ共和国 "
                },
                {
                 "value": "Denmark",
                 "text": "デンマーク "
                },
                {
                 "value": "Djibouti",
                 "text": "ジブチ "
                },
                {
                 "value": "Dominica",
                 "text": "ドミニカ "
                },
                {
                 "value": "Dominican Republic",
                 "text": "ドミニカ共和国 "
                },
                {
                 "value": "Ecuador",
                 "text": "エクアドル "
                },
                {
                 "value": "Egypt",
                 "text": "エジプト "
                },
                {
                 "value": "El Salvador",
                 "text": "エルサルバドル "
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "赤道ギニア共和国"
                },
                {
                 "value": "Eritrea",
                 "text": "エリトリア "
                },
                {
                 "value": "Estonia",
                 "text": "エストニア "
                },
                {
                 "value": "Ethiopia",
                 "text": "エチオピア "
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "フォークランド諸島（マルビナス） "
                },
                {
                 "value": "Faroe Islands",
                 "text": "フェロー諸島 "
                },
                {
                 "value": "Fiji",
                 "text": "フィジー "
                },
                {
                 "value": "Finland",
                 "text": "フィンランド "
                },
                {
                 "value": "France",
                 "text": "フランス "
                },
                {
                 "value": "French Guiana",
                 "text": "フランス領ギアナ "
                },
                {
                 "value": "French Polynesia",
                 "text": "フランス領ポリネシア "
                },
                {
                 "value": "French Southern Territories",
                 "text": "フランス領南方南方領土 "
                },
                {
                 "value": "Gabon",
                 "text": "ガボン "
                },
                {
                 "value": "Gambia",
                 "text": "ガンビア "
                },
                {
                 "value": "Georgia",
                 "text": "ジョージア "
                },
                {
                 "value": "Germany",
                 "text": "ドイツ "
                },
                {
                 "value": "Ghana",
                 "text": "ガーナ "
                },
                {
                 "value": "Gibraltar",
                 "text": "ジブラルタル "
                },
                {
                 "value": "Greece",
                 "text": "ギリシャ "
                },
                {
                 "value": "Greenland",
                 "text": "グリーンランド "
                },
                {
                 "value": "Grenada",
                 "text": "グレナダ "
                },
                {
                 "value": "Guadeloupe",
                 "text": "グアドループ "
                },
                {
                 "value": "Guam",
                 "text": "グアム "
                },
                {
                 "value": "Guatemala",
                 "text": "グアテマラ "
                },
                {
                 "value": "Guernsey",
                 "text": "ガーンジー "
                },
                {
                 "value": "Guinea",
                 "text": "ギニア "
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "ギニアビサウ "
                },
                {
                 "value": "Guyana",
                 "text": "ガイアナ "
                },
                {
                 "value": "Haiti",
                 "text": "ハイチ "
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "ハード島とマクドナルド諸島 "
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "聖座（バチカン市国） "
                },
                {
                 "value": "Honduras",
                 "text": "ホンジュラス "
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "香港特別行政区、中国 "
                },
                {
                 "value": "Hungary",
                 "text": "ハンガリー "
                },
                {
                 "value": "Iceland",
                 "text": "アイスランド "
                },
                {
                 "value": "India",
                 "text": "インド "
                },
                {
                 "value": "Indonesia",
                 "text": "インドネシア "
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "イラン、イスラム共和国 "
                },
                {
                 "value": "Iraq",
                 "text": "イラク "
                },
                {
                 "value": "Ireland",
                 "text": "アイルランド "
                },
                {
                 "value": "Isle of Man",
                 "text": "マン島 "
                },
                {
                 "value": "Israel",
                 "text": "イスラエル "
                },
                {
                 "value": "Italy",
                 "text": "イタリア "
                },
                {
                 "value": "Jamaica",
                 "text": "ジャマイカ "
                },
                {
                 "value": "Japan",
                 "text": "日本 "
                },
                {
                 "value": "Jersey",
                 "text": "ジャージー "
                },
                {
                 "value": "Jordan",
                 "text": "ヨルダン "
                },
                {
                 "value": "Kazakhstan",
                 "text": "カザフスタン "
                },
                {
                 "value": "Kenya",
                 "text": "ケニア "
                },
                {
                 "value": "Kiribati",
                 "text": "キリバス "
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "朝鮮民主主義人民共和国 "
                },
                {
                 "value": "Korea, Republic of",
                 "text": "大韓民国 "
                },
                {
                 "value": "Kuwait",
                 "text": "クウェート "
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "キルギスタン "
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "ラオス人民民主共和国 "
                },
                {
                 "value": "Latvia",
                 "text": "ラトビア "
                },
                {
                 "value": "Lebanon",
                 "text": "レバノン "
                },
                {
                 "value": "Lesotho",
                 "text": "レソト "
                },
                {
                 "value": "Liberia",
                 "text": "リベリア "
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "リビアアラブジャマヒリヤ "
                },
                {
                 "value": "Liechtenstein",
                 "text": "リヒテンシュタイン "
                },
                {
                 "value": "Lithuania",
                 "text": "リトアニア "
                },
                {
                 "value": "Luxembourg",
                 "text": "ルクセンブルク "
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "マカオSAR、中国 "
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "北マケドニア共和国 "
                },
                {
                 "value": "Madagascar",
                 "text": "マダガスカル "
                },
                {
                 "value": "Malawi",
                 "text": "マラウイ "
                },
                {
                 "value": "Malaysia",
                 "text": "マレーシア "
                },
                {
                 "value": "Maldives",
                 "text": "モルディブ "
                },
                {
                 "value": "Mali",
                 "text": "マリ "
                },
                {
                 "value": "Malta",
                 "text": "マルタ "
                },
                {
                 "value": "Marshall Islands",
                 "text": "マーシャル諸島 "
                },
                {
                 "value": "Martinique",
                 "text": "マルティニーク "
                },
                {
                 "value": "Mauritania",
                 "text": "モーリタニア "
                },
                {
                 "value": "Mauritius",
                 "text": "モーリシャス "
                },
                {
                 "value": "Mayotte",
                 "text": "マヨット "
                },
                {
                 "value": "Mexico",
                 "text": "メキシコ "
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "ミクロネシア連邦 "
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "モルドバ共和国 "
                },
                {
                 "value": "Monaco",
                 "text": "モナコ "
                },
                {
                 "value": "Mongolia",
                 "text": "モンゴル "
                },
                {
                 "value": "Montenegro",
                 "text": "モンテネグロ "
                },
                {
                 "value": "Montserrat",
                 "text": "モントセラト "
                },
                {
                 "value": "Morocco",
                 "text": "モロッコ "
                },
                {
                 "value": "Mozambique",
                 "text": "モザンビーク "
                },
                {
                 "value": "Myanmar",
                 "text": "ミャンマー "
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "北マリアナ諸島"
                },
                {
                 "value": "Namibia",
                 "text": "ナミビア "
                },
                {
                 "value": "Nauru",
                 "text": "ナウル "
                },
                {
                 "value": "Nepal",
                 "text": "ネパール "
                },
                {
                 "value": "Netherlands",
                 "text": "オランダ "
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "オランダ領アンティル "
                },
                {
                 "value": "New Caledonia",
                 "text": "ニューカレドニア "
                },
                {
                 "value": "New Zealand",
                 "text": "ニュージーランド "
                },
                {
                 "value": "Nicaragua",
                 "text": "ニカラグア "
                },
                {
                 "value": "Niger",
                 "text": "ニジェール "
                },
                {
                 "value": "Nigeria",
                 "text": "ナイジェリア "
                },
                {
                 "value": "Niue",
                 "text": "ニウエ "
                },
                {
                 "value": "Norfolk Island",
                 "text": "ノーフォーク島 "
                },
                {
                 "value": "North Korea",
                 "text": "北朝鮮 "
                },
                {
                 "value": "Norway",
                 "text": "ノルウェー "
                },
                {
                 "value": "Oman",
                 "text": "オマーン "
                },
                {
                 "value": "Pakistan",
                 "text": "パキスタン "
                },
                {
                 "value": "Palau",
                 "text": "パラオ "
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "パレスチナ地域（イスラエル占領下） "
                },
                {
                 "value": "Panama",
                 "text": "パナマ "
                },
                {
                 "value": "Papua New Guinea",
                 "text": "パプアニューギニア "
                },
                {
                 "value": "Paraguay",
                 "text": "パラグアイ "
                },
                {
                 "value": "Peru",
                 "text": "ペルー "
                },
                {
                 "value": "Philippines",
                 "text": "フィリピン "
                },
                {
                 "value": "Pitcairn",
                 "text": "ピトケアン "
                },
                {
                 "value": "Poland",
                 "text": "ポーランド "
                },
                {
                 "value": "Portugal",
                 "text": "ポルトガル "
                },
                {
                 "value": "Puerto Rico",
                 "text": "プエルトリコ "
                },
                {
                 "value": "Qatar",
                 "text": "カタール "
                },
                {
                 "value": "Reunion",
                 "text": "レユニオン "
                },
                {
                 "value": "Romania",
                 "text": "ルーマニア "
                },
                {
                 "value": "Russian Federation",
                 "text": "ロシア連邦 "
                },
                {
                 "value": "Rwanda",
                 "text": "ルワンダ "
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "サンバルテルミー "
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "セントヘレナ、アセンション、トリスタンダクーニャ "
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "セントクリストファーネイビス "
                },
                {
                 "value": "Saint Lucia",
                 "text": "セントルシア "
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "サンマルタン（フランス語部） "
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "サンピエール島とミクロン島 "
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "セントビンセントおよびグレナディーン諸島 "
                },
                {
                 "value": "Samoa",
                 "text": "サモア "
                },
                {
                 "value": "Samoa, American",
                 "text": "アメリカ領サモア "
                },
                {
                 "value": "San Marino",
                 "text": "サンマリノ "
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "サントメ・プリンシペ "
                },
                {
                 "value": "Saudi Arabia",
                 "text": "サウジアラビア "
                },
                {
                 "value": "Senegal",
                 "text": "セネガル "
                },
                {
                 "value": "Serbia",
                 "text": "セルビア "
                },
                {
                 "value": "Seychelles",
                 "text": "セイシェル "
                },
                {
                 "value": "Sierra Leone",
                 "text": "シエラレオネ "
                },
                {
                 "value": "Singapore",
                 "text": "シンガポール "
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "シント・マールテン（オランダ語部） "
                },
                {
                 "value": "Slovakia",
                 "text": "スロバキア "
                },
                {
                 "value": "Slovenia",
                 "text": "スロベニア "
                },
                {
                 "value": "Solomon Islands",
                 "text": "ソロモン諸島 "
                },
                {
                 "value": "Somalia",
                 "text": "ソマリア "
                },
                {
                 "value": "South Africa",
                 "text": "南アフリカ "
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "サウスジョージアおよびサウスサンドイッチ諸島 "
                },
                {
                 "value": "South Sudan",
                 "text": "南スーダン "
                },
                {
                 "value": "Spain",
                 "text": "スペイン "
                },
                {
                 "value": "Sri Lanka",
                 "text": "スリランカ "
                },
                {
                 "value": "Sudan",
                 "text": "スーダン "
                },
                {
                 "value": "Suriname",
                 "text": "スリナム "
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "スバールバル諸島およびヤンマイエン "
                },
                {
                 "value": "Swaziland",
                 "text": "スワジランド "
                },
                {
                 "value": "Sweden",
                 "text": "スウェーデン "
                },
                {
                 "value": "Switzerland",
                 "text": "スイス "
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "シリアアラブ共和国 "
                },
                {
                 "value": "Taiwan",
                 "text": "台湾 "
                },
                {
                 "value": "Tajikistan",
                 "text": "タジキスタン "
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "タンザニア連合共和国 "
                },
                {
                 "value": "Thailand",
                 "text": "タイ "
                },
                {
                 "value": "Timor-Leste",
                 "text": "東ティモール "
                },
                {
                 "value": "Togo",
                 "text": "トーゴ "
                },
                {
                 "value": "Tokelau",
                 "text": "トケラウ "
                },
                {
                 "value": "Tonga",
                 "text": "トンガ "
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "トリニダード・トバゴ "
                },
                {
                 "value": "Tunisia",
                 "text": "チュニジア "
                },
                {
                 "value": "Turkey",
                 "text": "トルコ "
                },
                {
                 "value": "Turkmenistan",
                 "text": "トルクメニスタン "
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "タークス・カイコス諸島 "
                },
                {
                 "value": "Tuvalu",
                 "text": "ツバル "
                },
                {
                 "value": "Uganda",
                 "text": "ウガンダ "
                },
                {
                 "value": "Ukraine",
                 "text": "ウクライナ "
                },
                {
                 "value": "United Arab Emirates",
                 "text": "アラブ首長国連邦 "
                },
                {
                 "value": "United Kingdom",
                 "text": "イギリス "
                },
                {
                 "value": "United States",
                 "text": "アメリカ "
                },
                {
                 "value": "Uruguay",
                 "text": "ウルグアイ "
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "合衆国領有小離島 "
                },
                {
                 "value": "Uzbekistan",
                 "text": "ウズベキスタン "
                },
                {
                 "value": "Vanuatu",
                 "text": "バヌアツ "
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "ベネズエラ・ボリバル共和国 "
                },
                {
                 "value": "Vietnam",
                 "text": "ベトナム "
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "英領バージン諸島 "
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "アメリカ領ヴァージン諸島  "
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "ウォリス・フツナ "
                },
                {
                 "value": "Western Sahara",
                 "text": "西サハラ "
                },
                {
                 "value": "Yemen",
                 "text": "イエメン "
                },
                {
                 "value": "Zambia",
                 "text": "ザンビア "
                },
                {
                 "value": "Zimbabwe",
                 "text": "ジンバブエ "
                }
               ]
            ,
            "requiredError": "このフィールドの値を選択してください ",
        },
        "State": {
            "type": "select",
            "label": "州 * ",
            "options": [
                {
                 "value": "",
                 "text": "お選びください "
                },
                {
                 "value": "AL",
                 "text": "アラバマ "
                },
                {
                 "value": "AK",
                 "text": "アラスカ "
                },
                {
                 "value": "AZ",
                 "text": "アリゾナ "
                },
                {
                 "value": "AR",
                 "text": "アーカンソー "
                },
                {
                 "value": "CA",
                 "text": "カリフォルニア "
                },
                {
                 "value": "CO",
                 "text": "コロラド "
                },
                {
                 "value": "CT",
                 "text": "コネチカット "
                },
                {
                 "value": "DE",
                 "text": "デラウェア "
                },
                {
                 "value": "FL",
                 "text": "フロリダ "
                },
                {
                 "value": "GA",
                 "text": "ジョージア "
                },
                {
                 "value": "HI",
                 "text": "ハワイ "
                },
                {
                 "value": "ID",
                 "text": "アイダホ "
                },
                {
                 "value": "IL",
                 "text": "イリノイ "
                },
                {
                 "value": "IN",
                 "text": "インディアナ "
                },
                {
                 "value": "IA",
                 "text": "アイオワ "
                },
                {
                 "value": "KS",
                 "text": "カンザス "
                },
                {
                 "value": "KY",
                 "text": "ケンタッキー "
                },
                {
                 "value": "LA",
                 "text": "ルイジアナ "
                },
                {
                 "value": "ME",
                 "text": "メイン "
                },
                {
                 "value": "MD",
                 "text": "メリーランド "
                },
                {
                 "value": "MA",
                 "text": "マサチューセッツ "
                },
                {
                 "value": "MI",
                 "text": "ミシガン "
                },
                {
                 "value": "MN",
                 "text": "ミネソタ "
                },
                {
                 "value": "MS",
                 "text": "ミシシッピ "
                },
                {
                 "value": "MO",
                 "text": "ミズーリ "
                },
                {
                 "value": "MT",
                 "text": "モンタナ "
                },
                {
                 "value": "NE",
                 "text": "ネブラスカ "
                },
                {
                 "value": "NV",
                 "text": "ネバダ "
                },
                {
                 "value": "NH",
                 "text": "ニューハンプシャー "
                },
                {
                 "value": "NJ",
                 "text": "ニュージャージー "
                },
                {
                 "value": "NM",
                 "text": "ニューメキシコ "
                },
                {
                 "value": "NY",
                 "text": "ニューヨーク "
                },
                {
                 "value": "NC",
                 "text": "ノースカロライナ州 "
                },
                {
                 "value": "ND",
                 "text": "ノースダコタ州 "
                },
                {
                 "value": "OH",
                 "text": "オハイオ "
                },
                {
                 "value": "OK",
                 "text": "オクラホマ "
                },
                {
                 "value": "OR",
                 "text": "オレゴン "
                },
                {
                 "value": "PA",
                 "text": "ペンシルベニア "
                },
                {
                 "value": "RI",
                 "text": "ロードアイランド "
                },
                {
                 "value": "SC",
                 "text": "サウスカロライナ "
                },
                {
                 "value": "SD",
                 "text": "サウス・ダコタ "
                },
                {
                 "value": "TN",
                 "text": "テネシー "
                },
                {
                 "value": "TX",
                 "text": "テキサス "
                },
                {
                 "value": "UT",
                 "text": "ユタ "
                },
                {
                 "value": "VT",
                 "text": "バーモント "
                },
                {
                 "value": "VA",
                 "text": "バージニア "
                },
                {
                 "value": "WA",
                 "text": "ワシントン "
                },
                {
                 "value": "WV",
                 "text": "ウェストバージニア "
                },
                {
                 "value": "WI",
                 "text": "ウィスコンシン "
                },
                {
                 "value": "WY",
                 "text": "ワイオミング "
                }
               ],
            "requiredError": "このフィールドの値を選択してください ",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "職業 ",
            "options": [
                {
                 "value": "",
                 "text": "選んでください "
                },
                {
                 "value": "Accountant/Controller",
                 "text": "会計士・経理部 "
                },
                {
                 "value": "Account Manager",
                 "text": "アカウントマネージャー "
                },
                {
                 "value": "Assistant",
                 "text": "アシスタント "
                },
                {
                 "value": "Branch Manager",
                 "text": "支店長 "
                },
                {
                 "value": "Chairman",
                 "text": "委員長 "
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "最高コンプライアンス責任者 "
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "最高デジタル責任者 "
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "最高経営責任者 "
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "最高財務責任者 "
                },
                {
                 "value": "Chief Information Officer",
                 "text": "最高情報責任者 "
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "最高マーケティング責任者 "
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "チーフメディカルオフィサー "
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "最高執行責任者 "
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "最高調達責任者 "
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "最高リスク責任者 "
                },
                {
                 "value": "Chief Security Officer",
                 "text": "最高セキュリティ責任者 "
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "最高技術責任者 "
                },
                {
                 "value": "Commercial Director",
                 "text": "コマーシャルディレクター "
                },
                {
                 "value": "Consultant",
                 "text": "コンサルタント "
                },
                {
                 "value": "Customer Experience",
                 "text": "カスタマーエクスペリエンス "
                },
                {
                 "value": "Customer Service",
                 "text": "顧客サービス "
                },
                {
                 "value": "Digital Transformation",
                 "text": "デジタルトランスフォーメーション "
                },
                {
                 "value": "Director- General",
                 "text": "局長 "
                },
                {
                 "value": "Director - Other",
                 "text": "その他局長 "
                },
                {
                 "value": "Director others",
                 "text": "その他局長 "
                },
                {
                 "value": "Distribution Director",
                 "text": "ディストリビューションディレクター "
                },
                {
                 "value": "Financial Director",
                 "text": "財務責任者 "
                },
                {
                 "value": "HR Director",
                 "text": "人事ディレクター "
                },
                {
                 "value": "HR Manager",
                 "text": "人事マネージャー "
                },
                {
                 "value": "IT Application Mangement",
                 "text": "ITアプリケーション管理 "
                },
                {
                 "value": "IT Consulting",
                 "text": "ITコンサルティング "
                },
                {
                 "value": "IT Director",
                 "text": "ITディレクター "
                },
                {
                 "value": "IT Manager",
                 "text": "ITマネージャ "
                },
                {
                 "value": "IT Operations",
                 "text": "IT運用 "
                },
                {
                 "value": "IT Strategy",
                 "text": "IT戦略 "
                },
                {
                 "value": "IT System Integration",
                 "text": "ITシステム統合 "
                },
                {
                 "value": "Management others",
                 "text": "その他の管理 "
                },
                {
                 "value": "Managing Director",
                 "text": "取締役社長 "
                },
                {
                 "value": "Managing Partner",
                 "text": "業務執行社員 "
                },
                {
                 "value": "MarCom Manager",
                 "text": "マーコムマネージャー "
                },
                {
                 "value": "Marketing Director",
                 "text": "マーケティング部長 "
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "取締役会メンバー "
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "監査役会のメンバー "
                },
                {
                 "value": "Minister",
                 "text": "大臣 "
                },
                {
                 "value": "Minister of State",
                 "text": "国務大臣 "
                },
                {
                 "value": "Nursing",
                 "text": "看護 "
                },
                {
                 "value": "Operations Director",
                 "text": "オペレーションディレクター "
                },
                {
                 "value": "Other",
                 "text": "その他 "
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA・アシスタント "
                },
                {
                 "value": "President Board of Directors",
                 "text": "社長取締役会 "
                },
                {
                 "value": "President Supervisory Board",
                 "text": "監査役会会長 "
                },
                {
                 "value": "Press",
                 "text": "プレス "
                },
                {
                 "value": "Procurement",
                 "text": "調達 "
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "広報マネージャー "
                },
                {
                 "value": "Public Relations Manager",
                 "text": "広報マネージャー "
                },
                {
                 "value": "Sales Director",
                 "text": "販売担当重役 "
                },
                {
                 "value": "Sales Manager",
                 "text": "営業部長 "
                },
                {
                 "value": "Secretary",
                 "text": "秘書 "
                },
                {
                 "value": "State Secretary",
                 "text": "国務長官 "
                },
                {
                 "value": "Supervisor",
                 "text": "スーパーバイザー "
                },
                {
                 "value": "Vice-Chairman",
                 "text": "副会長 "
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "副大統領 取締役会 "
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "副大統領 監査役会 "
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "肩書 ",
        },
        "interestedIn" : {
            "type": "select",
            "label": "製品 *",
            "options": [
                {
                 "value": "",
                 "text": "お選びください "
                },
                {
                 "value": "IAM solution",
                 "text": "IAMソリューション"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "SSO（シングルサインオン）"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "強化認証管理"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "アイデンティティのガバナンスと管理"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Webアクセス管理"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion（アイデンティティアズアサービス）"
                },
                {
                 "value": "High Availability",
                 "text": "高可用性（SafeKit）"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "アイデンティティのインテリジェント分析"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "その他 "
                }
               ],
            "requiredError": "このフィールドの値を選択してください ",
        },
        "enquiryType" : {
            "type": "select",
            "label": "お問い合わせタイプ *",
            "options": [
                {
                 "value": "",
                 "text": "お選びください "
                },
                {
                 "value": "Product Information",
                 "text": "情報"
                },
                {
                 "value": "Price Quote",
                 "text": "お見積書"
                },
                {
                 "value": "Demo",
                 "text": "デモンストレーション"
                },
                {
                 "value": "Free trial package",
                 "text": "無料トライアル （ダウンロード）"
                },
                {
                 "value": "Free trial license",
                 "text": "無料トライアル （ライセンス）"
                },
                {
                 "value": "Training & Certification",
                 "text": "トレーニングと認定"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "貴社のための新しいソリューションまたはサービス "
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "製品・カスタマーサポート（現在のEvidenクライアントのみ） "
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "会計・請求またはお支払い "
                },
                {
                 "value": "Job Information",
                 "text": "採用情報 "
                },
                {
                 "value": "Press Inquiry",
                 "text": "プレスお問い合わせ "
                },
                {
                 "value": "Selling to Eviden",
                 "text": "アトスへの販売 "
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "アライアンス・パートナーシップ "
                },
                {
                 "value": "Other",
                 "text": "その他 "
                }
               ],
            "requiredError": "このフィールドの値を選択してください ",
        },
        "enquiry" : {
            "type": "text",
            "label": "お問い合わせ ",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "購入権限の有無 ",
            "options": [
                {
                    "value": "",
                    "text": "お選びください "
                },
                {
                    "value": "Yes",
                    "text": "有 "
                },
                {
                    "value": "No",
                    "text": "無 "
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "購入タイムライン ",
            "options": [
                {
                    "value": "",
                    "text": "お選びください "
                },
                {
                    "value": "Less than 3 months",
                    "text": "3か月未満 "
                },
                {
                    "value": "3 to 6 Months",
                    "text": "3〜6か月 "
                },
                {
                    "value": "6 to 12 Months",
                    "text": "6〜12か月 "
                },
                {
                    "value": "Over 12 Months",
                    "text": "12か月以上 "
                },
            ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "情報配信への同意 *",
            "options": [
                {
                    "value": "yes",
                    "text": "はい "
                },
                {
                    "value": "no",
                    "text": "いいえ "
                }
            ],
            "requiredError": "このフィールドの値を選択してください ",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、<a href='https://gdpr.eu/' target='blank'>GDPR</a>を介してあなたに権利を与えます。 このフォームを送信することにより、<a href='https://eviden.com/privacy-policy/' target='blank'>プライバシーポリシー</a>の条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。"
            },
            {
             "value": "DPA",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、DPAを介してあなたに権利を与えます。 このフォームを送信することにより、プライバシーポリシーの条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。 "
            },
            {
             "value": "CCPA",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、CCPA・CPRAを介してあなたに権利を与えます。 このフォームを送信することにより、プライバシーポリシーの条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。 "
            },
            {
             "value": "CASL",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、CASLを介してあなたに権利を与えます。 このフォームを送信することにより、プライバシーポリシーの条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。 "
            },
            {
             "value": "LGDP",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、LGDPを介してあなたに権利を与えます。 このフォームを送信することにより、プライバシーポリシーの条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。 "
            },
            {
             "value": "POPIA",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、POPIAを介してあなたに権利を与えます。 このフォームを送信することにより、プライバシーポリシーの条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。 "
            },
            {
             "value": "LFPDPPP",
             "text": "あなたのプライバシーは弊社にとって重要です。 お国は、LFPDPPPを介してあなたに権利を与えます。 このフォームを送信することにより、プライバシーポリシーの条件に同意いただいたことになります。 権利がどのように守られているか、そしてご希望の場合のデータ削除方法を理解していただくためにプライバシーポリシーをお読みください。 "
            },
            {
             "value": "none",
             "text": "お客様のプライバシーは弊社にとって重要です。このフォームを送信することにより、弊社の<a href='https://eviden.com/privacy-policy/' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</a>の条件に同意したものとみなされます。お客様の権利がどのように守られているかをご理解いただくため、プライバシーポリシーをお読みください。"
            }
           ],
        
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Evidenからイベントやオファリングに関連する適切な連絡を確実に受け取れるように、オプトインしてください。いつでもオプトアウトできます。 "
            },
            {
                "value": "CCPA",
                "text": "このフォームにご詳細を入力することにより、弊社のプライバシーポリシーに従い、弊社のイベントや提供物に関連するアトスからの連絡を受け取ることに同意していただきます。いつでもオプトアウトできます。 "
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "送信 "
        },
        "ThankYouEmptyDataContent" : "ご関心をお寄せいただき、ありがとうございます。 ",
        "ThankYouDataContent" : "ご関心をお寄せいただき、ありがとうございます。",
        "DownloadLinkText" : "こちらからレポートをダウンロードできます。 ",
        "ContactTYText" : "弊社のチームのメンバーからご連絡差し上げます。しばらくお待ちください。 "
    },
    "English GB": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Preferred Language",
            "options": [
                {
                    "value": "",
                    "text": "Please select"
                   },
                   {
                    "value": "English GB",
                    "text": "English-GB"
                   },
                   {
                    "value": "English US",
                    "text": "English-US"
                   },
                   {
                    "value": "French",
                    "text": "French"
                   },
                   {
                    "value": "Italian",
                    "text": "Italian"
                   },
                   {
                    "value": "German",
                    "text": "German"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Latin American Spanish"
                   },
                   {
                    "value": "European Spanish",
                    "text": "European Spanish"
                   },
                   {
                    "value": "Dutch",
                    "text": "Dutch"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Brazilian Portuguese"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japanese"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Salutation",
            "options": [
                {
                    "value": "", 
                    "text": "Please select"
                },
                {
                    "value": "Mr.", 
                    "text": "Mr."
                },
                {
                    "value": "Mrs.", 
                    "text": "Mrs."
                },
                {
                    "value": "Ms.", 
                    "text": "Ms."
                },
                {
                    "value": "Miss.", 
                    "text": "Miss."
                },                
                {
                    "value": "Mx.", 
                    "text": "Mx."
                },                
                {
                    "value": "Master", 
                    "text": "Master"
                },                
                {
                    "value": "Sir", 
                    "text": "Sir"
                },                
                {
                    "value": "Dr.", 
                    "text": "Dr."
                },
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "First Name *",
            "requiredError": "This field is required",
            },
        "LastName": {
            "type": "text",
            "label": "Last Name *",
            "requiredError": "This field is required",
            },        
        "Email" : {
            "type": "email",
            "label": "Business Email Address *",
            "requiredError": "Please enter a valid email address",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Industry *",
            "options": [
                {
                    "value": "",
                    "text": "Please select"
                   },
                   {
                    "value": "Accounting",
                    "text": "Accounting"
                   },
                   {
                    "value": "Airlines/Aviation",
                    "text": "Airlines/Aviation"
                   },
                   {
                    "value": "Alternative Dispute Resolution",
                    "text": "Alternative Dispute Resolution"
                   },
                   {
                    "value": "Alternative Medicine",
                    "text": "Alternative Medicine"
                   },
                   {
                    "value": "Animation",
                    "text": "Animation"
                   },
                   {
                    "value": "Apparel & Fashion",
                    "text": "Apparel & Fashion"
                   },
                   {
                    "value": "Architecture & Planning",
                    "text": "Architecture & Planning"
                   },
                   {
                    "value": "Arts and Crafts",
                    "text": "Arts and Crafts"
                   },
                   {
                    "value": "Automotive",
                    "text": "Automotive"
                   },
                   {
                    "value": "Aviation & Aerospace",
                    "text": "Aviation & Aerospace"
                   },
                   {
                    "value": "Banking",
                    "text": "Banking"
                   },
                   {
                    "value": "Biotechnology",
                    "text": "Biotechnology"
                   },
                   {
                    "value": "Broadcast Media",
                    "text": "Broadcast Media"
                   },
                   {
                    "value": "Building Materials",
                    "text": "Building Materials"
                   },
                   {
                    "value": "Business Supplies and Equipment",
                    "text": "Business Supplies and Equipment"
                   },
                   {
                    "value": "Capital Markets",
                    "text": "Capital Markets"
                   },
                   {
                    "value": "Chemicals",
                    "text": "Chemicals"
                   },
                   {
                    "value": "Civic & Social Organisation",
                    "text": "Civic & Social Organisation"
                   },
                   {
                    "value": "Civil Engineering",
                    "text": "Civil Engineering"
                   },
                   {
                    "value": "Commercial Real Estate",
                    "text": "Commercial Real Estate"
                   },
                   {
                    "value": "Computer & Network Security",
                    "text": "Computer & Network Security"
                   },
                   {
                    "value": "Computer Games",
                    "text": "Computer Games"
                   },
                   {
                    "value": "Computer Hardware",
                    "text": "Computer Hardware"
                   },
                   {
                    "value": "Computer Networking",
                    "text": "Computer Networking"
                   },
                   {
                    "value": "Computer Software",
                    "text": "Computer Software"
                   },
                   {
                    "value": "Construction",
                    "text": "Construction"
                   },
                   {
                    "value": "Consumer Electronics",
                    "text": "Consumer Electronics"
                   },
                   {
                    "value": "Consumer Goods",
                    "text": "Consumer Goods"
                   },
                   {
                    "value": "Consumer Services",
                    "text": "Consumer Services"
                   },
                   {
                    "value": "Cosmetics",
                    "text": "Cosmetics"
                   },
                   {
                    "value": "Dairy",
                    "text": "Dairy"
                   },
                   {
                    "value": "Defence & Space",
                    "text": "Defence & Space"
                   },
                   {
                    "value": "Design",
                    "text": "Design"
                   },
                   {
                    "value": "Education Management",
                    "text": "Education Management"
                   },
                   {
                    "value": "E-Learning",
                    "text": "E-Learning"
                   },
                   {
                    "value": "Electrical/Electronic Manufacturing",
                    "text": "Electrical/Electronic Manufacturing"
                   },
                   {
                    "value": "Entertainment",
                    "text": "Entertainment"
                   },
                   {
                    "value": "Environmental Services",
                    "text": "Environmental Services"
                   },
                   {
                    "value": "Events Services",
                    "text": "Events Services"
                   },
                   {
                    "value": "Executive Office",
                    "text": "Executive Office"
                   },
                   {
                    "value": "Facilities Services",
                    "text": "Facilities Services"
                   },
                   {
                    "value": "Farming",
                    "text": "Farming"
                   },
                   {
                    "value": "Financial Services",
                    "text": "Financial Services"
                   },
                   {
                    "value": "Fine Art",
                    "text": "Fine Art"
                   },
                   {
                    "value": "Fishery",
                    "text": "Fishery"
                   },
                   {
                    "value": "Food & Beverages",
                    "text": "Food & Beverages"
                   },
                   {
                    "value": "Food Production",
                    "text": "Food Production"
                   },
                   {
                    "value": "Fund-Raising",
                    "text": "Fund-Raising"
                   },
                   {
                    "value": "Furniture",
                    "text": "Furniture"
                   },
                   {
                    "value": "Gambling & Casinos",
                    "text": "Gambling & Casinos"
                   },
                   {
                    "value": "Glass, Ceramics & Concrete",
                    "text": "Glass, Ceramics & Concrete"
                   },
                   {
                    "value": "Government Administration",
                    "text": "Government Administration"
                   },
                   {
                    "value": "Government Relations",
                    "text": "Government Relations"
                   },
                   {
                    "value": "Graphic Design",
                    "text": "Graphic Design"
                   },
                   {
                    "value": "Health, Wellness and Fitness",
                    "text": "Health, Wellness and Fitness"
                   },
                   {
                    "value": "Higher Education",
                    "text": "Higher Education"
                   },
                   {
                    "value": "Hospital & Health Care",
                    "text": "Hospital & Health Care"
                   },
                   {
                    "value": "Hospitality",
                    "text": "Hospitality"
                   },
                   {
                    "value": "Human Resources",
                    "text": "Human Resources"
                   },
                   {
                    "value": "Import and Export",
                    "text": "Import and Export"
                   },
                   {
                    "value": "Individual & Family Services",
                    "text": "Individual & Family Services"
                   },
                   {
                    "value": "Industrial Automation",
                    "text": "Industrial Automation"
                   },
                   {
                    "value": "Information Services",
                    "text": "Information Services"
                   },
                   {
                    "value": "Information Technology and Services",
                    "text": "Information Technology and Services"
                   },
                   {
                    "value": "Insurance",
                    "text": "Insurance"
                   },
                   {
                    "value": "International Affairs",
                    "text": "International Affairs"
                   },
                   {
                    "value": "International Trade and Development",
                    "text": "International Trade and Development"
                   },
                   {
                    "value": "Internet",
                    "text": "Internet"
                   },
                   {
                    "value": "Investment Banking",
                    "text": "Investment Banking"
                   },
                   {
                    "value": "Investment Management",
                    "text": "Investment Management"
                   },
                   {
                    "value": "Judiciary",
                    "text": "Judiciary"
                   },
                   {
                    "value": "Law Enforcement",
                    "text": "Law Enforcement"
                   },
                   {
                    "value": "Law Practice",
                    "text": "Law Practice"
                   },
                   {
                    "value": "Legal Services",
                    "text": "Legal Services"
                   },
                   {
                    "value": "Legislative Office",
                    "text": "Legislative Office"
                   },
                   {
                    "value": "Leisure, Travel & Tourism",
                    "text": "Leisure, Travel & Tourism"
                   },
                   {
                    "value": "Libraries",
                    "text": "Libraries"
                   },
                   {
                    "value": "Logistics and Supply Chain",
                    "text": "Logistics and Supply Chain"
                   },
                   {
                    "value": "Luxury Goods & Jewellery",
                    "text": "Luxury Goods & Jewellery"
                   },
                   {
                    "value": "Machinery",
                    "text": "Machinery"
                   },
                   {
                    "value": "Management Consulting",
                    "text": "Management Consulting"
                   },
                   {
                    "value": "Maritime",
                    "text": "Maritime"
                   },
                   {
                    "value": "Market Research",
                    "text": "Market Research"
                   },
                   {
                    "value": "Marketing and Advertising",
                    "text": "Marketing and Advertising"
                   },
                   {
                    "value": "Mechanical or Industrial Engineering",
                    "text": "Mechanical or Industrial Engineering"
                   },
                   {
                    "value": "Media Production",
                    "text": "Media Production"
                   },
                   {
                    "value": "Medical Devices",
                    "text": "Medical Devices"
                   },
                   {
                    "value": "Medical Practice",
                    "text": "Medical Practice"
                   },
                   {
                    "value": "Mental Health Care",
                    "text": "Mental Health Care"
                   },
                   {
                    "value": "Military",
                    "text": "Military"
                   },
                   {
                    "value": "Mining & Metals",
                    "text": "Mining & Metals"
                   },
                   {
                    "value": "Mobile Games",
                    "text": "Mobile Games"
                   },
                   {
                    "value": "Motion Pictures and Film",
                    "text": "Motion Pictures and Film"
                   },
                   {
                    "value": "Museums and Institutions",
                    "text": "Museums and Institutions"
                   },
                   {
                    "value": "Music",
                    "text": "Music"
                   },
                   {
                    "value": "Nanotechnology",
                    "text": "Nanotechnology"
                   },
                   {
                    "value": "Newspapers",
                    "text": "Newspapers"
                   },
                   {
                    "value": "Non-Profit Organisation Management",
                    "text": "Non-Profit Organisation Management"
                   },
                   {
                    "value": "Oil & Energy",
                    "text": "Oil & Energy"
                   },
                   {
                    "value": "Online Media",
                    "text": "Online Media"
                   },
                   {
                    "value": "Other",
                    "text": "Other"
                   },
                   {
                    "value": "Outsourcing/Offshoring",
                    "text": "Outsourcing/Offshoring"
                   },
                   {
                    "value": "Package/Freight Delivery",
                    "text": "Package/Freight Delivery"
                   },
                   {
                    "value": "Packaging and Containers",
                    "text": "Packaging and Containers"
                   },
                   {
                    "value": "Paper & Forest Products",
                    "text": "Paper & Forest Products"
                   },
                   {
                    "value": "Performing Arts",
                    "text": "Performing Arts"
                   },
                   {
                    "value": "Pharmaceuticals",
                    "text": "Pharmaceuticals"
                   },
                   {
                    "value": "Philanthropy",
                    "text": "Philanthropy"
                   },
                   {
                    "value": "Photography",
                    "text": "Photography"
                   },
                   {
                    "value": "Plastics",
                    "text": "Plastics"
                   },
                   {
                    "value": "Political Organisation",
                    "text": "Political Organisation"
                   },
                   {
                    "value": "Primary/Secondary Education",
                    "text": "Primary/Secondary Education"
                   },
                   {
                    "value": "Printing",
                    "text": "Printing"
                   },
                   {
                    "value": "Professional Training & Coaching",
                    "text": "Professional Training & Coaching"
                   },
                   {
                    "value": "Program Development",
                    "text": "Program Development"
                   },
                   {
                    "value": "Public Policy",
                    "text": "Public Policy"
                   },
                   {
                    "value": "Public Relations and Communications",
                    "text": "Public Relations and Communications"
                   },
                   {
                    "value": "Public Safety",
                    "text": "Public Safety"
                   },
                   {
                    "value": "Publishing",
                    "text": "Publishing"
                   },
                   {
                    "value": "Railroad Manufacture",
                    "text": "Railroad Manufacture"
                   },
                   {
                    "value": "Ranching",
                    "text": "Ranching"
                   },
                   {
                    "value": "Real Estate",
                    "text": "Real Estate"
                   },
                   {
                    "value": "Recreational Facilities and Services",
                    "text": "Recreational Facilities and Services"
                   },
                   {
                    "value": "Religious Institutions",
                    "text": "Religious Institutions"
                   },
                   {
                    "value": "Renewables & Environment",
                    "text": "Renewables & Environment"
                   },
                   {
                    "value": "Research",
                    "text": "Research"
                   },
                   {
                    "value": "Restaurants",
                    "text": "Restaurants"
                   },
                   {
                    "value": "Retail",
                    "text": "Retail"
                   },
                   {
                    "value": "Security and Investigations",
                    "text": "Security and Investigations"
                   },
                   {
                    "value": "Semiconductors",
                    "text": "Semiconductors"
                   },
                   {
                    "value": "Shipbuilding",
                    "text": "Shipbuilding"
                   },
                   {
                    "value": "Sporting Goods",
                    "text": "Sporting Goods"
                   },
                   {
                    "value": "Sports",
                    "text": "Sports"
                   },
                   {
                    "value": "Staffing and Recruiting",
                    "text": "Staffing and Recruiting"
                   },
                   {
                    "value": "Supermarkets",
                    "text": "Supermarkets"
                   },
                   {
                    "value": "Telecommunications",
                    "text": "Telecommunications"
                   },
                   {
                    "value": "Textiles",
                    "text": "Textiles"
                   },
                   {
                    "value": "Think Tanks",
                    "text": "Think Tanks"
                   },
                   {
                    "value": "Tobacco",
                    "text": "Tobacco"
                   },
                   {
                    "value": "Translation and Localisation",
                    "text": "Translation and Localisation"
                   },
                   {
                    "value": "Transportation/Trucking/Railroad",
                    "text": "Transportation/Trucking/Railroad"
                   },
                   {
                    "value": "Utilities",
                    "text": "Utilities"
                   },
                   {
                    "value": "Venture Capital & Private Equity",
                    "text": "Venture Capital & Private Equity"
                   },
                   {
                    "value": "Veterinary",
                    "text": "Veterinary"
                   },
                   {
                    "value": "Warehousing",
                    "text": "Warehousing"
                   },
                   {
                    "value": "Wholesale",
                    "text": "Wholesale"
                   },
                   {
                    "value": "Wine and Spirits",
                    "text": "Wine and Spirits"
                   },
                   {
                    "value": "Wireless",
                    "text": "Wireless"
                   },
                   {
                    "value": "Writing and Editing",
                    "text": "Writing and Editing"
                   }
            ],
            "requiredError": "Please select a value for this field",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Business Phone *",
            "requiredError": "Please enter a valid telephone number",
        },
        "Company" : {
            "type": "text",
            "label": "Company/Organisation Name *",
            "requiredError": "This field is required",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Company Revenue",
            "options": [ 
                {
                    "value": "", 
                    "text": "Please select"
                },
                { 
                    "value": "Smaller than $200mil", 
                    "text": "Smaller than $200mil"
                },
                {
                    "value": "$201mil to $500mil", 
                    "text": "$201mil to $500mil"
                },
                {
                    "value": "$501mil to $1bil", 
                    "text": "$501mil to $1bil"
                },
                {
                    "value": "Greater than $1bil", 
                    "text": "Greater than $1bil"
                },
            ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Company Size",
            "options": [ 
                {
                    "value": "", 
                    "text": "Please select"
                },
                { 
                    "value": "Smaller than 3,000 Employees", 
                    "text": "Smaller than 3,000 Employees"
                },
                {
                    "value": "3,001 to 5,000 Employees", 
                    "text": "3,001 to 5,000 Employees"
                },
                {
                    "value": "5,001 to 10,000 Employees", 
                    "text": "5,001 to 10,000 Employees"
                },
                {
                    "value": "Greater than 10,001 Employees", 
                    "text": "Greater than 10,001 Employees"
                },
            ]
        },
        "Country": {
            "type": "select",
            "label": "Country *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afghanistan"
                },
                {
                 "value": "Aland Islands",
                 "text": "Aland Islands"
                },
                {
                 "value": "Albania",
                 "text": "Albania"
                },
                {
                 "value": "Algeria",
                 "text": "Algeria"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguilla"
                },
                {
                 "value": "Antarctica",
                 "text": "Antarctica"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua and Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentina"
                },
                {
                 "value": "Armenia",
                 "text": "Armenia"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australia"
                },
                {
                 "value": "Austria",
                 "text": "Austria"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaijan"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahrain"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesh"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Belarus"
                },
                {
                 "value": "Belgium",
                 "text": "Belgium"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Benin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermuda"
                },
                {
                 "value": "Bhutan",
                 "text": "Bhutan"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivia, Plurinational State of"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Sint Eustatius and Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnia and Herzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botswana"
                },
                {
                 "value": "Brazil",
                 "text": "Brazil"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "British Indian Ocean Territory"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "British Virgin Islands"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgaria"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Cambodia"
                },
                {
                 "value": "Cameroon",
                 "text": "Cameroon"
                },
                {
                 "value": "Canada",
                 "text": "Canada"
                },
                {
                 "value": "Cape Verde",
                 "text": "Cape Verde"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Cayman Islands"
                },
                {
                 "value": "Central African Republic",
                 "text": "Central African Republic"
                },
                {
                 "value": "Chad",
                 "text": "Chad"
                },
                {
                 "value": "Chile",
                 "text": "Chile"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Christmas Island",
                 "text": "Christmas Island"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Cocos (Keeling) Islands"
                },
                {
                 "value": "Colombia",
                 "text": "Colombia"
                },
                {
                 "value": "Comoros",
                 "text": "Comoros"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, the Democratic Republic of the"
                },
                {
                 "value": "Cook Islands",
                 "text": "Cook Islands"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Cote d'Ivoire"
                },
                {
                 "value": "Crimea Region",
                 "text": "Crimea Region"
                },
                {
                 "value": "Croatia",
                 "text": "Croatia"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Cyprus",
                 "text": "Cyprus"
                },
                {
                 "value": "Czech Republic",
                 "text": "Czech Republic"
                },
                {
                 "value": "Denmark",
                 "text": "Denmark"
                },
                {
                 "value": "Djibouti",
                 "text": "Djibouti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "Dominican Republic"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "Egypt",
                 "text": "Egypt"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Equatorial Guinea"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estonia"
                },
                {
                 "value": "Ethiopia",
                 "text": "Ethiopia"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Falkland Islands (Malvinas)"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Faroe Islands"
                },
                {
                 "value": "Fiji",
                 "text": "Fiji"
                },
                {
                 "value": "Finland",
                 "text": "Finland"
                },
                {
                 "value": "France",
                 "text": "France"
                },
                {
                 "value": "French Guiana",
                 "text": "French Guiana"
                },
                {
                 "value": "French Polynesia",
                 "text": "French Polynesia"
                },
                {
                 "value": "French Southern Territories",
                 "text": "French Southern Territories"
                },
                {
                 "value": "Gabon",
                 "text": "Gabon"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgia"
                },
                {
                 "value": "Germany",
                 "text": "Germany"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Greece"
                },
                {
                 "value": "Greenland",
                 "text": "Greenland"
                },
                {
                 "value": "Grenada",
                 "text": "Grenada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadeloupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinea-Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haiti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Heard Island and McDonald Islands"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Holy See (Vatican City State)"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Hong Kong S.A.R., China"
                },
                {
                 "value": "Hungary",
                 "text": "Hungary"
                },
                {
                 "value": "Iceland",
                 "text": "Iceland"
                },
                {
                 "value": "India",
                 "text": "India"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesia"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Iran, Islamic Republic of"
                },
                {
                 "value": "Iraq",
                 "text": "Iraq"
                },
                {
                 "value": "Ireland",
                 "text": "Ireland"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isle of Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Italy"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaica"
                },
                {
                 "value": "Japan",
                 "text": "Japan"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordan"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazakhstan"
                },
                {
                 "value": "Kenya",
                 "text": "Kenya"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Korea, Democratic People's Republic of"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Korea, Republic of"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kyrgyzstan"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "Lao People's Democratic Republic"
                },
                {
                 "value": "Latvia",
                 "text": "Latvia"
                },
                {
                 "value": "Lebanon",
                 "text": "Lebanon"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesotho"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Libyan Arab Jamahiriya"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lithuania"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxembourg"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Macao S.A.R., China"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macedonia, the former Yugoslav Republic of"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malawi"
                },
                {
                 "value": "Malaysia",
                 "text": "Malaysia"
                },
                {
                 "value": "Maldives",
                 "text": "Maldives"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Marshall Islands"
                },
                {
                 "value": "Martinique",
                 "text": "Martinique"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritania"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauritius"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "Mexico"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronesia, Federated States of"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldova, Republic of"
                },
                {
                 "value": "Monaco",
                 "text": "Monaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolia"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Morocco"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Myanmar"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "N.Mariana Islnd"
                },
                {
                 "value": "Namibia",
                 "text": "Namibia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Netherlands"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Netherlands Antilles"
                },
                {
                 "value": "New Caledonia",
                 "text": "New Caledonia"
                },
                {
                 "value": "New Zealand",
                 "text": "New Zealand"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Niger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Norfolk Island"
                },
                {
                 "value": "North Korea",
                 "text": "North Korea"
                },
                {
                 "value": "Norway",
                 "text": "Norway"
                },
                {
                 "value": "Oman",
                 "text": "Oman"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistan"
                },
                {
                 "value": "Palau",
                 "text": "Palau"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Palestinian Territory, Occupied"
                },
                {
                 "value": "Panama",
                 "text": "Panama"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papua New Guinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Peru"
                },
                {
                 "value": "Philippines",
                 "text": "Philippines"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Poland"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Puerto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Qatar"
                },
                {
                 "value": "Reunion",
                 "text": "Reunion"
                },
                {
                 "value": "Romania",
                 "text": "Romania"
                },
                {
                 "value": "Russian Federation",
                 "text": "Russian Federation"
                },
                {
                 "value": "Rwanda",
                 "text": "Rwanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "Saint Barthélemy"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Saint Helena, Ascension and Tristan da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "Saint Kitts and Nevis"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Saint Lucia"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "Saint Martin (French part)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "Saint Pierre and Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "Saint Vincent and the Grenadines"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, American"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "Sao Tome and Principe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Saudi Arabia"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbia"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leone"
                },
                {
                 "value": "Singapore",
                 "text": "Singapore"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint Maarten (Dutch part)"
                },
                {
                 "value": "Slovakia",
                 "text": "Slovakia"
                },
                {
                 "value": "Slovenia",
                 "text": "Slovenia"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Solomon Islands"
                },
                {
                 "value": "Somalia",
                 "text": "Somalia"
                },
                {
                 "value": "South Africa",
                 "text": "South Africa"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "South Georgia and the South Sandwich Islands"
                },
                {
                 "value": "South Sudan",
                 "text": "South Sudan"
                },
                {
                 "value": "Spain",
                 "text": "Spain"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Sudan"
                },
                {
                 "value": "Suriname",
                 "text": "Suriname"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard and Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Swaziland"
                },
                {
                 "value": "Sweden",
                 "text": "Sweden"
                },
                {
                 "value": "Switzerland",
                 "text": "Switzerland"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "Syrian Arab Republic"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tajikistan"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzania, United Republic of"
                },
                {
                 "value": "Thailand",
                 "text": "Thailand"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor-Leste"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad and Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunisia"
                },
                {
                 "value": "Turkey",
                 "text": "Turkey"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistan"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Turks and Caicos Islands"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ukraine"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "United Arab Emirates"
                },
                {
                 "value": "United Kingdom",
                 "text": "United Kingdom"
                },
                {
                 "value": "United States",
                 "text": "United States"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "US Minor Outl.Isl."
                },
                {
                 "value": "Uzbekistan",
                 "text": "Uzbekistan"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, Bolivarian Republic of"
                },
                {
                 "value": "Vietnam",
                 "text": "Viet Nam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Virgin Islands, British"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Virgin Islands, US"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis and Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Western Sahara"
                },
                {
                 "value": "Yemen",
                 "text": "Yemen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabwe"
                }
               ]
            ,
            "requiredError": "Please select a value for this field",
        },
        "State": {
            "type": "select",
            "label": "State *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "California"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawaii"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississippi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "New Jersey"
                },
                {
                 "value": "NM",
                 "text": "New Mexico"
                },
                {
                 "value": "NY",
                 "text": "New York"
                },
                {
                 "value": "NC",
                 "text": "North Carolina"
                },
                {
                 "value": "ND",
                 "text": "North Dakota"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pennsylvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "South Carolina"
                },
                {
                 "value": "SD",
                 "text": "South Dakota"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "West Virginia"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Please select a value for this field",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Job Function",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Accountant/Controller"
                },
                {
                 "value": "Account Manager",
                 "text": "Account Manager"
                },
                {
                 "value": "Assistant",
                 "text": "Assistant"
                },
                {
                 "value": "Branch Manager",
                 "text": "Branch Manager"
                },
                {
                 "value": "Chairman",
                 "text": "Chairman"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Chief Compliance Officer"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Chief Digital Officer"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Chief Executive Officer"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Chief Financial Officer"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Chief Information Officer"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Chief Marketing Officer"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Chief Medical Officer"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Chief Operations Officer"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Chief Procurement Officer"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Chief Risk Officer"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Chief Security Officer"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Chief Technology Officer"
                },
                {
                 "value": "Commercial Director",
                 "text": "Commercial Director"
                },
                {
                 "value": "Consultant",
                 "text": "Consultant"
                },
                {
                 "value": "Customer Experience",
                 "text": "Customer Experience"
                },
                {
                 "value": "Customer Service",
                 "text": "Customer Service"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Digital Transformation"
                },
                {
                 "value": "Director- General",
                 "text": "Director- General"
                },
                {
                 "value": "Director - Other",
                 "text": "Director - Other"
                },
                {
                 "value": "Director others",
                 "text": "Director others"
                },
                {
                 "value": "Distribution Director",
                 "text": "Distribution Director"
                },
                {
                 "value": "Financial Director",
                 "text": "Financial Director"
                },
                {
                 "value": "HR Director",
                 "text": "HR Director"
                },
                {
                 "value": "HR Manager",
                 "text": "HR Manager"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "IT Application Mangement"
                },
                {
                 "value": "IT Consulting",
                 "text": "IT Consulting"
                },
                {
                 "value": "IT Director",
                 "text": "IT Director"
                },
                {
                 "value": "IT Manager",
                 "text": "IT Manager"
                },
                {
                 "value": "IT Operations",
                 "text": "IT Operations"
                },
                {
                 "value": "IT Strategy",
                 "text": "IT Strategy"
                },
                {
                 "value": "IT System Integration",
                 "text": "IT System Integration"
                },
                {
                 "value": "Management others",
                 "text": "Management others"
                },
                {
                 "value": "Managing Director",
                 "text": "Managing Director"
                },
                {
                 "value": "Managing Partner",
                 "text": "Managing Partner"
                },
                {
                 "value": "MarCom Manager",
                 "text": "MarCom Manager"
                },
                {
                 "value": "Marketing Director",
                 "text": "Marketing Director"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Member of Board of Directors"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Member of Supervisory Board"
                },
                {
                 "value": "Minister",
                 "text": "Minister"
                },
                {
                 "value": "Minister of State",
                 "text": "Minister of State"
                },
                {
                 "value": "Nursing",
                 "text": "Nursing"
                },
                {
                 "value": "Operations Director",
                 "text": "Operations Director"
                },
                {
                 "value": "Other",
                 "text": "Other"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Assistant"
                },
                {
                 "value": "President Board of Directors",
                 "text": "President Board of Directors"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "President Supervisory Board"
                },
                {
                 "value": "Press",
                 "text": "Press"
                },
                {
                 "value": "Procurement",
                 "text": "Procurement"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Public Rel. Manager"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Public Relations Manager"
                },
                {
                 "value": "Sales Director",
                 "text": "Sales Director"
                },
                {
                 "value": "Sales Manager",
                 "text": "Sales Manager"
                },
                {
                 "value": "Secretary",
                 "text": "Secretary"
                },
                {
                 "value": "State Secretary",
                 "text": "State Secretary"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisor"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vice-Chairman"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vice Pres. Board of Directors"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vice Pres. Supervisory Board"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Job Title",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Product *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "IAM solution",
                 "text": "IAM solution"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "SSO Single Sign-on"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Strong Authentication Management"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Identity Governance and Administration"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Web Access Manager"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (Identity As-a-Service)"
                },
                {
                 "value": "High Availability",
                 "text": "High Availability (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Identity Analytics Intelligence"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Other"
                }
               ],
            "requiredError": "Please select a value in this field ",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Enquiry Type *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "Product Information",
                 "text": "Information"
                },
                {
                 "value": "Price Quote",
                 "text": "Price"
                },
                {
                 "value": "Demo",
                 "text": "Demonstration"
                },
                {
                 "value": "Free trial package",
                 "text": "Trial"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Training & Certification"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "New Solution or Services for Your Business"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Product/Customer Support (current Eviden clients only)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Accounting, Billing or Payments"
                },
                {
                 "value": "Job Information",
                 "text": "Job Information"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Press Inquiry"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Selling to Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Alliance/Partnership Matters"
                },
                {
                 "value": "Other",
                 "text": "Other"
                }
               ],
            "requiredError": "Please select a value in this field ",
        },
        "enquiry" : {
            "type": "text",
            "label": "Enquiry",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Purchase Authority",
            "options": [
                {
                    "value": "", 
                    "text": "Please select"
                },
                {
                    "value": "Yes", 
                    "text": "Yes"
                },
                {
                    "value": "No", 
                    "text": "No"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Purchase Timeline",
            "options": [
                {
                    "value": "", 
                    "text": "Please select"
                },
                {
                    "value": "Less than 3 months", 
                    "text": "Less than 3 months"
                },
                {
                    "value": "3 to 6 Months", 
                    "text": "3 to 6 Months"
                },
                {
                    "value": "6 to 12 Months", 
                    "text": "6 to 12 Months"
                },
                {
                    "value": "Over 12 Months", 
                    "text": "Over 12 Months"
                },
            ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Opt-in *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Yes"
                },
                {
                    "value": "no", 
                    "text": "No"
                }
            ],
            "requiredError": "Please select a value for this field",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Your privacy is important to us. Your country provides you rights via the GDPR. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "DPA",
             "text": "Your privacy is important to us. Your country provides you rights via the DPA. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "CCPA",
             "text": "Your privacy is important to us. Your country provides you rights via the CCPA/CPRA. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "CASL",
             "text": "Your privacy is important to us. Your country provides you rights via the CASL. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "LGDP",
             "text": "Your privacy is important to us. Your country provides you rights via the LGPD. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "POPIA",
             "text": "Your privacy is important to us. Your country provides you rights via the POPIA. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "LFPDPPP",
             "text": "Your privacy is important to us. Your country provides you rights via the LFPDPPP. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
            },
            {
             "value": "none",
             "text": "Your privacy is important to us. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld."
            }
           ],
        
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*To ensure you receive relevant communications from Eviden relating to our events and offerings please opt-in. You can opt-out at any time."
            },
            {
                "value": "CCPA",
                "text": "By providing your information on this form, you consent to receive communications from Eviden relating to our events and offerings in accordance with our Privacy Policy. You can opt-out at any time."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Submit"
        },
        "ThankYouEmptyDataContent" : "Thank you for your interest.",
        "ThankYouDataContent" : "Thank you for your interest in",
        "DownloadLinkText" : "You can download the report here.",
        "ContactTYText" : "A member of our team will be in touch with you shortly"
    },

    "English US": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Preferred Language",
            "options": [
                {
                    "value": "",
                    "text": "Please select"
                   },
                   {
                    "value": "English GB",
                    "text": "English-GB"
                   },
                   {
                    "value": "English US",
                    "text": "English-US"
                   },
                   {
                    "value": "French",
                    "text": "French"
                   },
                   {
                    "value": "Italian",
                    "text": "Italian"
                   },
                   {
                    "value": "German",
                    "text": "German"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Latin American Spanish"
                   },
                   {
                    "value": "European Spanish",
                    "text": "European Spanish"
                   },
                   {
                    "value": "Dutch",
                    "text": "Dutch"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Brazilian Portuguese"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japanese"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Salutation",
            "options": [
                {
                    "value": "", 
                    "text": "Please select"
                },
                {
                    "value": "Mr.", 
                    "text": "Mr."
                },
                {
                    "value": "Mrs.", 
                    "text": "Mrs."
                },
                {
                    "value": "Ms.", 
                    "text": "Ms."
                },
                {
                    "value": "Miss.", 
                    "text": "Miss."
                },                {
                    "value": "Mx.", 
                    "text": "Mx."
                },                {
                    "value": "Master", 
                    "text": "Master"
                },                {
                    "value": "Sir", 
                    "text": "Sir"
                },                {
                    "value": "Dr.", 
                    "text": "Dr."
                },
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "First Name *",
            "requiredError": "This field is required",
            },
        "LastName": {
            "type": "text",
            "label": "Last Name *",
            "requiredError": "This field is required",
            },        
        "Email" : {
            "type": "email",
            "label": "Business Email Address *",
            "requiredError": "Please enter a valid email address",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Industry *",
            "options": [
                {
                    "value": "",
                    "text": "Please select"
                   },
                   {
                    "value": "Accounting",
                    "text": "Accounting"
                   },
                   {
                    "value": "Airlines/Aviation",
                    "text": "Airlines/Aviation"
                   },
                   {
                    "value": "Alternative Dispute Resolution",
                    "text": "Alternative Dispute Resolution"
                   },
                   {
                    "value": "Alternative Medicine",
                    "text": "Alternative Medicine"
                   },
                   {
                    "value": "Animation",
                    "text": "Animation"
                   },
                   {
                    "value": "Apparel & Fashion",
                    "text": "Apparel & Fashion"
                   },
                   {
                    "value": "Architecture & Planning",
                    "text": "Architecture & Planning"
                   },
                   {
                    "value": "Arts and Crafts",
                    "text": "Arts and Crafts"
                   },
                   {
                    "value": "Automotive",
                    "text": "Automotive"
                   },
                   {
                    "value": "Aviation & Aerospace",
                    "text": "Aviation & Aerospace"
                   },
                   {
                    "value": "Banking",
                    "text": "Banking"
                   },
                   {
                    "value": "Biotechnology",
                    "text": "Biotechnology"
                   },
                   {
                    "value": "Broadcast Media",
                    "text": "Broadcast Media"
                   },
                   {
                    "value": "Building Materials",
                    "text": "Building Materials"
                   },
                   {
                    "value": "Business Supplies and Equipment",
                    "text": "Business Supplies and Equipment"
                   },
                   {
                    "value": "Capital Markets",
                    "text": "Capital Markets"
                   },
                   {
                    "value": "Chemicals",
                    "text": "Chemicals"
                   },
                   {
                    "value": "Civic & Social Organisation",
                    "text": "Civic & Social Organization"
                   },
                   {
                    "value": "Civil Engineering",
                    "text": "Civil Engineering"
                   },
                   {
                    "value": "Commercial Real Estate",
                    "text": "Commercial Real Estate"
                   },
                   {
                    "value": "Computer & Network Security",
                    "text": "Computer & Network Security"
                   },
                   {
                    "value": "Computer Games",
                    "text": "Computer Games"
                   },
                   {
                    "value": "Computer Hardware",
                    "text": "Computer Hardware"
                   },
                   {
                    "value": "Computer Networking",
                    "text": "Computer Networking"
                   },
                   {
                    "value": "Computer Software",
                    "text": "Computer Software"
                   },
                   {
                    "value": "Construction",
                    "text": "Construction"
                   },
                   {
                    "value": "Consumer Electronics",
                    "text": "Consumer Electronics"
                   },
                   {
                    "value": "Consumer Goods",
                    "text": "Consumer Goods"
                   },
                   {
                    "value": "Consumer Services",
                    "text": "Consumer Services"
                   },
                   {
                    "value": "Cosmetics",
                    "text": "Cosmetics"
                   },
                   {
                    "value": "Dairy",
                    "text": "Dairy"
                   },
                   {
                    "value": "Defence & Space",
                    "text": "Defense & Space"
                   },
                   {
                    "value": "Design",
                    "text": "Design"
                   },
                   {
                    "value": "Education Management",
                    "text": "Education Management"
                   },
                   {
                    "value": "E-Learning",
                    "text": "E-Learning"
                   },
                   {
                    "value": "Electrical/Electronic Manufacturing",
                    "text": "Electrical/Electronic Manufacturing"
                   },
                   {
                    "value": "Entertainment",
                    "text": "Entertainment"
                   },
                   {
                    "value": "Environmental Services",
                    "text": "Environmental Services"
                   },
                   {
                    "value": "Events Services",
                    "text": "Events Services"
                   },
                   {
                    "value": "Executive Office",
                    "text": "Executive Office"
                   },
                   {
                    "value": "Facilities Services",
                    "text": "Facilities Services"
                   },
                   {
                    "value": "Farming",
                    "text": "Farming"
                   },
                   {
                    "value": "Financial Services",
                    "text": "Financial Services"
                   },
                   {
                    "value": "Fine Art",
                    "text": "Fine Art"
                   },
                   {
                    "value": "Fishery",
                    "text": "Fishery"
                   },
                   {
                    "value": "Food & Beverages",
                    "text": "Food & Beverages"
                   },
                   {
                    "value": "Food Production",
                    "text": "Food Production"
                   },
                   {
                    "value": "Fund-Raising",
                    "text": "Fundraising"
                   },
                   {
                    "value": "Furniture",
                    "text": "Furniture"
                   },
                   {
                    "value": "Gambling & Casinos",
                    "text": "Gambling & Casinos"
                   },
                   {
                    "value": "Glass, Ceramics & Concrete",
                    "text": "Glass, Ceramics & Concrete"
                   },
                   {
                    "value": "Government Administration",
                    "text": "Government Administration"
                   },
                   {
                    "value": "Government Relations",
                    "text": "Government Relations"
                   },
                   {
                    "value": "Graphic Design",
                    "text": "Graphic Design"
                   },
                   {
                    "value": "Health, Wellness and Fitness",
                    "text": "Health, Wellness and Fitness"
                   },
                   {
                    "value": "Higher Education",
                    "text": "Higher Education"
                   },
                   {
                    "value": "Hospital & Health Care",
                    "text": "Hospital & Health Care"
                   },
                   {
                    "value": "Hospitality",
                    "text": "Hospitality"
                   },
                   {
                    "value": "Human Resources",
                    "text": "Human Resources"
                   },
                   {
                    "value": "Import and Export",
                    "text": "Import and Export"
                   },
                   {
                    "value": "Individual & Family Services",
                    "text": "Individual & Family Services"
                   },
                   {
                    "value": "Industrial Automation",
                    "text": "Industrial Automation"
                   },
                   {
                    "value": "Information Services",
                    "text": "Information Services"
                   },
                   {
                    "value": "Information Technology and Services",
                    "text": "Information Technology and Services"
                   },
                   {
                    "value": "Insurance",
                    "text": "Insurance"
                   },
                   {
                    "value": "International Affairs",
                    "text": "International Affairs"
                   },
                   {
                    "value": "International Trade and Development",
                    "text": "International Trade and Development"
                   },
                   {
                    "value": "Internet",
                    "text": "Internet"
                   },
                   {
                    "value": "Investment Banking",
                    "text": "Investment Banking"
                   },
                   {
                    "value": "Investment Management",
                    "text": "Investment Management"
                   },
                   {
                    "value": "Judiciary",
                    "text": "Judiciary"
                   },
                   {
                    "value": "Law Enforcement",
                    "text": "Law Enforcement"
                   },
                   {
                    "value": "Law Practice",
                    "text": "Law Practice"
                   },
                   {
                    "value": "Legal Services",
                    "text": "Legal Services"
                   },
                   {
                    "value": "Legislative Office",
                    "text": "Legislative Office"
                   },
                   {
                    "value": "Leisure, Travel & Tourism",
                    "text": "Leisure, Travel & Tourism"
                   },
                   {
                    "value": "Libraries",
                    "text": "Libraries"
                   },
                   {
                    "value": "Logistics and Supply Chain",
                    "text": "Logistics and Supply Chain"
                   },
                   {
                    "value": "Luxury Goods & Jewellery",
                    "text": "Luxury Goods & Jewelry"
                   },
                   {
                    "value": "Machinery",
                    "text": "Machinery"
                   },
                   {
                    "value": "Management Consulting",
                    "text": "Management Consulting"
                   },
                   {
                    "value": "Maritime",
                    "text": "Maritime"
                   },
                   {
                    "value": "Market Research",
                    "text": "Market Research"
                   },
                   {
                    "value": "Marketing and Advertising",
                    "text": "Marketing and Advertising"
                   },
                   {
                    "value": "Mechanical or Industrial Engineering",
                    "text": "Mechanical or Industrial Engineering"
                   },
                   {
                    "value": "Media Production",
                    "text": "Media Production"
                   },
                   {
                    "value": "Medical Devices",
                    "text": "Medical Devices"
                   },
                   {
                    "value": "Medical Practice",
                    "text": "Medical Practice"
                   },
                   {
                    "value": "Mental Health Care",
                    "text": "Mental Health Care"
                   },
                   {
                    "value": "Military",
                    "text": "Military"
                   },
                   {
                    "value": "Mining & Metals",
                    "text": "Mining & Metals"
                   },
                   {
                    "value": "Mobile Games",
                    "text": "Mobile Games"
                   },
                   {
                    "value": "Motion Pictures and Film",
                    "text": "Motion Pictures and Film"
                   },
                   {
                    "value": "Museums and Institutions",
                    "text": "Museums and Institutions"
                   },
                   {
                    "value": "Music",
                    "text": "Music"
                   },
                   {
                    "value": "Nanotechnology",
                    "text": "Nanotechnology"
                   },
                   {
                    "value": "Newspapers",
                    "text": "Newspapers"
                   },
                   {
                    "value": "Non-Profit Organisation Management",
                    "text": "Non-Profit Organization Management"
                   },
                   {
                    "value": "Oil & Energy",
                    "text": "Oil & Energy"
                   },
                   {
                    "value": "Online Media",
                    "text": "Online Media"
                   },
                   {
                    "value": "Other",
                    "text": "Other"
                   },
                   {
                    "value": "Outsourcing/Offshoring",
                    "text": "Outsourcing/Offshoring"
                   },
                   {
                    "value": "Package/Freight Delivery",
                    "text": "Package/Freight Delivery"
                   },
                   {
                    "value": "Packaging and Containers",
                    "text": "Packaging and Containers"
                   },
                   {
                    "value": "Paper & Forest Products",
                    "text": "Paper & Forest Products"
                   },
                   {
                    "value": "Performing Arts",
                    "text": "Performing Arts"
                   },
                   {
                    "value": "Pharmaceuticals",
                    "text": "Pharmaceuticals"
                   },
                   {
                    "value": "Philanthropy",
                    "text": "Philanthropy"
                   },
                   {
                    "value": "Photography",
                    "text": "Photography"
                   },
                   {
                    "value": "Plastics",
                    "text": "Plastics"
                   },
                   {
                    "value": "Political Organisation",
                    "text": "Political Organization"
                   },
                   {
                    "value": "Primary/Secondary Education",
                    "text": "Primary/Secondary Education"
                   },
                   {
                    "value": "Printing",
                    "text": "Printing"
                   },
                   {
                    "value": "Professional Training & Coaching",
                    "text": "Professional Training & Coaching"
                   },
                   {
                    "value": "Program Development",
                    "text": "Program Development"
                   },
                   {
                    "value": "Public Policy",
                    "text": "Public Policy"
                   },
                   {
                    "value": "Public Relations and Communications",
                    "text": "Public Relations and Communications"
                   },
                   {
                    "value": "Public Safety",
                    "text": "Public Safety"
                   },
                   {
                    "value": "Publishing",
                    "text": "Publishing"
                   },
                   {
                    "value": "Railroad Manufacture",
                    "text": "Railroad Manufacture"
                   },
                   {
                    "value": "Ranching",
                    "text": "Ranching"
                   },
                   {
                    "value": "Real Estate",
                    "text": "Real Estate"
                   },
                   {
                    "value": "Recreational Facilities and Services",
                    "text": "Recreational Facilities and Services"
                   },
                   {
                    "value": "Religious Institutions",
                    "text": "Religious Institutions"
                   },
                   {
                    "value": "Renewables & Environment",
                    "text": "Renewables & Environment"
                   },
                   {
                    "value": "Research",
                    "text": "Research"
                   },
                   {
                    "value": "Restaurants",
                    "text": "Restaurants"
                   },
                   {
                    "value": "Retail",
                    "text": "Retail"
                   },
                   {
                    "value": "Security and Investigations",
                    "text": "Security and Investigations"
                   },
                   {
                    "value": "Semiconductors",
                    "text": "Semiconductors"
                   },
                   {
                    "value": "Shipbuilding",
                    "text": "Shipbuilding"
                   },
                   {
                    "value": "Sporting Goods",
                    "text": "Sporting Goods"
                   },
                   {
                    "value": "Sports",
                    "text": "Sports"
                   },
                   {
                    "value": "Staffing and Recruiting",
                    "text": "Staffing and Recruiting"
                   },
                   {
                    "value": "Supermarkets",
                    "text": "Supermarkets"
                   },
                   {
                    "value": "Telecommunications",
                    "text": "Telecommunications"
                   },
                   {
                    "value": "Textiles",
                    "text": "Textiles"
                   },
                   {
                    "value": "Think Tanks",
                    "text": "Think Tanks"
                   },
                   {
                    "value": "Tobacco",
                    "text": "Tobacco"
                   },
                   {
                    "value": "Translation and Localisation",
                    "text": "Translation and Localization"
                   },
                   {
                    "value": "Transportation/Trucking/Railroad",
                    "text": "Transportation/Trucking/Railroad"
                   },
                   {
                    "value": "Utilities",
                    "text": "Utilities"
                   },
                   {
                    "value": "Venture Capital & Private Equity",
                    "text": "Venture Capital & Private Equity"
                   },
                   {
                    "value": "Veterinary",
                    "text": "Veterinary"
                   },
                   {
                    "value": "Warehousing",
                    "text": "Warehousing"
                   },
                   {
                    "value": "Wholesale",
                    "text": "Wholesale"
                   },
                   {
                    "value": "Wine and Spirits",
                    "text": "Wine and Spirits"
                   },
                   {
                    "value": "Wireless",
                    "text": "Wireless"
                   },
                   {
                    "value": "Writing and Editing",
                    "text": "Writing and Editing"
                   }
            ],
            "requiredError": "Please select a value for this field",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Business Phone *",
            "requiredError": "Please enter a valid telephone number",
        },
        "Company" : {
            "type": "text",
            "label": "Company/Organization Name *",
            "requiredError": "This field is required",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Company Revenue",
            "options": [ 
                {
                    "value": "", 
                    "text": "Please select"
                },
                { 
                    "value": "Smaller than $200mil", 
                    "text": "Smaller than $200mil"
                },
                {
                    "value": "$201mil to $500mil", 
                    "text": "$201mil to $500mil"
                },
                {
                    "value": "$501mil to $1bil", 
                    "text": "$501mil to $1bil"
                },
                {
                    "value": "Greater than $1bil", 
                    "text": "Greater than $1bil"
                },
            ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Company Size",
            "options": [ 
                {
                    "value": "", 
                    "text": "Please select"
                },
                { 
                    "value": "Smaller than 3,000 Employees", 
                    "text": "Smaller than 3,000 Employees"
                },
                {
                    "value": "3,001 to 5,000 Employees", 
                    "text": "3,001 to 5,000 Employees"
                },
                {
                    "value": "5,001 to 10,000 Employees", 
                    "text": "5,001 to 10,000 Employees"
                },
                {
                    "value": "Greater than 10,001 Employees", 
                    "text": "Greater than 10,001 Employees"
                },
            ]
        },
        "Country": {
            "type": "select",
            "label": "Country *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afghanistan"
                },
                {
                 "value": "Aland Islands",
                 "text": "Aland Islands"
                },
                {
                 "value": "Albania",
                 "text": "Albania"
                },
                {
                 "value": "Algeria",
                 "text": "Algeria"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguilla"
                },
                {
                 "value": "Antarctica",
                 "text": "Antarctica"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua and Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentina"
                },
                {
                 "value": "Armenia",
                 "text": "Armenia"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australia"
                },
                {
                 "value": "Austria",
                 "text": "Austria"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaijan"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahrain"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesh"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Belarus"
                },
                {
                 "value": "Belgium",
                 "text": "Belgium"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Benin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermuda"
                },
                {
                 "value": "Bhutan",
                 "text": "Bhutan"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivia, Plurinational State of"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Sint Eustatius and Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnia and Herzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botswana"
                },
                {
                 "value": "Brazil",
                 "text": "Brazil"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "British Indian Ocean Territory"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "British Virgin Islands"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgaria"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Cambodia"
                },
                {
                 "value": "Cameroon",
                 "text": "Cameroon"
                },
                {
                 "value": "Canada",
                 "text": "Canada"
                },
                {
                 "value": "Cape Verde",
                 "text": "Cape Verde"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Cayman Islands"
                },
                {
                 "value": "Central African Republic",
                 "text": "Central African Republic"
                },
                {
                 "value": "Chad",
                 "text": "Chad"
                },
                {
                 "value": "Chile",
                 "text": "Chile"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Christmas Island",
                 "text": "Christmas Island"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Cocos (Keeling) Islands"
                },
                {
                 "value": "Colombia",
                 "text": "Colombia"
                },
                {
                 "value": "Comoros",
                 "text": "Comoros"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, the Democratic Republic of the"
                },
                {
                 "value": "Cook Islands",
                 "text": "Cook Islands"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Cote d'Ivoire"
                },
                {
                 "value": "Crimea Region",
                 "text": "Crimea Region"
                },
                {
                 "value": "Croatia",
                 "text": "Croatia"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Cyprus",
                 "text": "Cyprus"
                },
                {
                 "value": "Czech Republic",
                 "text": "Czech Republic"
                },
                {
                 "value": "Denmark",
                 "text": "Denmark"
                },
                {
                 "value": "Djibouti",
                 "text": "Djibouti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "Dominican Republic"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "Egypt",
                 "text": "Egypt"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Equatorial Guinea"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estonia"
                },
                {
                 "value": "Ethiopia",
                 "text": "Ethiopia"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Falkland Islands (Malvinas)"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Faroe Islands"
                },
                {
                 "value": "Fiji",
                 "text": "Fiji"
                },
                {
                 "value": "Finland",
                 "text": "Finland"
                },
                {
                 "value": "France",
                 "text": "France"
                },
                {
                 "value": "French Guiana",
                 "text": "French Guiana"
                },
                {
                 "value": "French Polynesia",
                 "text": "French Polynesia"
                },
                {
                 "value": "French Southern Territories",
                 "text": "French Southern Territories"
                },
                {
                 "value": "Gabon",
                 "text": "Gabon"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgia"
                },
                {
                 "value": "Germany",
                 "text": "Germany"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Greece"
                },
                {
                 "value": "Greenland",
                 "text": "Greenland"
                },
                {
                 "value": "Grenada",
                 "text": "Grenada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadeloupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinea-Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haiti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Heard Island and McDonald Islands"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Holy See (Vatican City State)"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Hong Kong S.A.R., China"
                },
                {
                 "value": "Hungary",
                 "text": "Hungary"
                },
                {
                 "value": "Iceland",
                 "text": "Iceland"
                },
                {
                 "value": "India",
                 "text": "India"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesia"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Iran, Islamic Republic of"
                },
                {
                 "value": "Iraq",
                 "text": "Iraq"
                },
                {
                 "value": "Ireland",
                 "text": "Ireland"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isle of Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Italy"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaica"
                },
                {
                 "value": "Japan",
                 "text": "Japan"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordan"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazakhstan"
                },
                {
                 "value": "Kenya",
                 "text": "Kenya"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Korea, Democratic People's Republic of"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Korea, Republic of"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kyrgyzstan"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "Lao People's Democratic Republic"
                },
                {
                 "value": "Latvia",
                 "text": "Latvia"
                },
                {
                 "value": "Lebanon",
                 "text": "Lebanon"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesotho"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Libyan Arab Jamahiriya"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lithuania"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxembourg"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Macao S.A.R., China"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macedonia, the former Yugoslav Republic of"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malawi"
                },
                {
                 "value": "Malaysia",
                 "text": "Malaysia"
                },
                {
                 "value": "Maldives",
                 "text": "Maldives"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Marshall Islands"
                },
                {
                 "value": "Martinique",
                 "text": "Martinique"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritania"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauritius"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "Mexico"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronesia, Federated States of"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldova, Republic of"
                },
                {
                 "value": "Monaco",
                 "text": "Monaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolia"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Morocco"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Myanmar"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "N. Mariana Islands"
                },
                {
                 "value": "Namibia",
                 "text": "Namibia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Netherlands"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Netherlands Antilles"
                },
                {
                 "value": "New Caledonia",
                 "text": "New Caledonia"
                },
                {
                 "value": "New Zealand",
                 "text": "New Zealand"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Niger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Norfolk Island"
                },
                {
                 "value": "North Korea",
                 "text": "North Korea"
                },
                {
                 "value": "Norway",
                 "text": "Norway"
                },
                {
                 "value": "Oman",
                 "text": "Oman"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistan"
                },
                {
                 "value": "Palau",
                 "text": "Palau"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Palestinian Territory, Occupied"
                },
                {
                 "value": "Panama",
                 "text": "Panama"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papua New Guinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Peru"
                },
                {
                 "value": "Philippines",
                 "text": "Philippines"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Poland"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Puerto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Qatar"
                },
                {
                 "value": "Reunion",
                 "text": "Reunion"
                },
                {
                 "value": "Romania",
                 "text": "Romania"
                },
                {
                 "value": "Russian Federation",
                 "text": "Russian Federation"
                },
                {
                 "value": "Rwanda",
                 "text": "Rwanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "Saint Barthélemy"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Saint Helena, Ascension and Tristan da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "Saint Kitts and Nevis"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Saint Lucia"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "Saint Martin (French part)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "Saint Pierre and Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "Saint Vincent and the Grenadines"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, American"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "Sao Tome and Principe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Saudi Arabia"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbia"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leone"
                },
                {
                 "value": "Singapore",
                 "text": "Singapore"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint Maarten (Dutch part)"
                },
                {
                 "value": "Slovakia",
                 "text": "Slovakia"
                },
                {
                 "value": "Slovenia",
                 "text": "Slovenia"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Solomon Islands"
                },
                {
                 "value": "Somalia",
                 "text": "Somalia"
                },
                {
                 "value": "South Africa",
                 "text": "South Africa"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "South Georgia and the South Sandwich Islands"
                },
                {
                 "value": "South Sudan",
                 "text": "South Sudan"
                },
                {
                 "value": "Spain",
                 "text": "Spain"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Sudan"
                },
                {
                 "value": "Suriname",
                 "text": "Suriname"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard and Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Swaziland"
                },
                {
                 "value": "Sweden",
                 "text": "Sweden"
                },
                {
                 "value": "Switzerland",
                 "text": "Switzerland"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "Syrian Arab Republic"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tajikistan"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzania, United Republic of"
                },
                {
                 "value": "Thailand",
                 "text": "Thailand"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor-Leste"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad and Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunisia"
                },
                {
                 "value": "Turkey",
                 "text": "Turkey"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistan"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Turks and Caicos Islands"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ukraine"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "United Arab Emirates"
                },
                {
                 "value": "United Kingdom",
                 "text": "United Kingdom"
                },
                {
                 "value": "United States",
                 "text": "United States"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "US Minor Outl. Isl."
                },
                {
                 "value": "Uzbekistan",
                 "text": "Uzbekistan"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, Bolivarian Republic of"
                },
                {
                 "value": "Vietnam",
                 "text": "Viet Nam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Virgin Islands, British"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Virgin Islands, US"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis and Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Western Sahara"
                },
                {
                 "value": "Yemen",
                 "text": "Yemen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabwe"
                }
               ]
            ,
            "requiredError": "Please select a value for this field",
        },
        "State": {
            "type": "select",
            "label": "State *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "California"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawaii"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississippi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "New Jersey"
                },
                {
                 "value": "NM",
                 "text": "New Mexico"
                },
                {
                 "value": "NY",
                 "text": "New York"
                },
                {
                 "value": "NC",
                 "text": "North Carolina"
                },
                {
                 "value": "ND",
                 "text": "North Dakota"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pennsylvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "South Carolina"
                },
                {
                 "value": "SD",
                 "text": "South Dakota"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "West Virginia"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Please select a value for this field",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Job Function",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Accountant/Controller"
                },
                {
                 "value": "Account Manager",
                 "text": "Account Manager"
                },
                {
                 "value": "Assistant",
                 "text": "Assistant"
                },
                {
                 "value": "Branch Manager",
                 "text": "Branch Manager"
                },
                {
                 "value": "Chairman",
                 "text": "Chairman"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Chief Compliance Officer"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Chief Digital Officer"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Chief Executive Officer"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Chief Financial Officer"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Chief Information Officer"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Chief Marketing Officer"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Chief Medical Officer"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Chief Operations Officer"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Chief Procurement Officer"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Chief Risk Officer"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Chief Security Officer"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Chief Technology Officer"
                },
                {
                 "value": "Commercial Director",
                 "text": "Commercial Director"
                },
                {
                 "value": "Consultant",
                 "text": "Consultant"
                },
                {
                 "value": "Customer Experience",
                 "text": "Customer Experience"
                },
                {
                 "value": "Customer Service",
                 "text": "Customer Service"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Digital Transformation"
                },
                {
                 "value": "Director- General",
                 "text": "Director- General"
                },
                {
                 "value": "Director - Other",
                 "text": "Director - Other"
                },
                {
                 "value": "Director others",
                 "text": "Director others"
                },
                {
                 "value": "Distribution Director",
                 "text": "Distribution Director"
                },
                {
                 "value": "Financial Director",
                 "text": "Financial Director"
                },
                {
                 "value": "HR Director",
                 "text": "HR Director"
                },
                {
                 "value": "HR Manager",
                 "text": "HR Manager"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "IT Application Management"
                },
                {
                 "value": "IT Consulting",
                 "text": "IT Consulting"
                },
                {
                 "value": "IT Director",
                 "text": "IT Director"
                },
                {
                 "value": "IT Manager",
                 "text": "IT Manager"
                },
                {
                 "value": "IT Operations",
                 "text": "IT Operations"
                },
                {
                 "value": "IT Strategy",
                 "text": "IT Strategy"
                },
                {
                 "value": "IT System Integration",
                 "text": "IT System Integration"
                },
                {
                 "value": "Management others",
                 "text": "Management others"
                },
                {
                 "value": "Managing Director",
                 "text": "Managing Director"
                },
                {
                 "value": "Managing Partner",
                 "text": "Managing Partner"
                },
                {
                 "value": "MarCom Manager",
                 "text": "MarCom Manager"
                },
                {
                 "value": "Marketing Director",
                 "text": "Marketing Director"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Member of Board of Directors"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Member of Supervisory Board"
                },
                {
                 "value": "Minister",
                 "text": "Minister"
                },
                {
                 "value": "Minister of State",
                 "text": "Minister of State"
                },
                {
                 "value": "Nursing",
                 "text": "Nursing"
                },
                {
                 "value": "Operations Director",
                 "text": "Operations Director"
                },
                {
                 "value": "Other",
                 "text": "Other"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Assistant"
                },
                {
                 "value": "President Board of Directors",
                 "text": "President Board of Directors"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Chairperson Supervisory Board"
                },
                {
                 "value": "Press",
                 "text": "Press"
                },
                {
                 "value": "Procurement",
                 "text": "Procurement"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Public Rel. Manager"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Public Relations Manager"
                },
                {
                 "value": "Sales Director",
                 "text": "Sales Director"
                },
                {
                 "value": "Sales Manager",
                 "text": "Sales Manager"
                },
                {
                 "value": "Secretary",
                 "text": "Secretary"
                },
                {
                 "value": "State Secretary",
                 "text": "State Secretary"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisor"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vice-Chairman"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vice-Chair Board of Directors"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vice-Chair Supervisory Board"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Job Title",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Product *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "IAM solution",
                 "text": "IAM solution"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "SSO Single Sign-on"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Strong Authentication Management"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Identity Governance and Administration"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Web Access Manager"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (Identity As-a-Service)"
                },
                {
                 "value": "High Availability",
                 "text": "High Availability (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Identity Analytics Intelligence"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Other"
                }
               ],
            "requiredError": "Please select a value in this field ",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Inquiry Type *",
            "options": [
                {
                 "value": "",
                 "text": "Please select"
                },
                {
                 "value": "Product Information",
                 "text": "Information"
                },
                {
                 "value": "Price Quote",
                 "text": "Price"
                },
                {
                 "value": "Demo",
                 "text": "Demonstration"
                },
                {
                 "value": "Free trial package",
                 "text": "Trial"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Training & Certification"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "New Solution or Services for Your Business"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Product/Customer Support (current Eviden clients only)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Accounting, Billing or Payments"
                },
                {
                 "value": "Job Information",
                 "text": "Job Information"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Press Inquiry"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Selling to Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Alliance/Partnership Matters"
                },
                {
                 "value": "Other",
                 "text": "Other"
                }
               ],
            "requiredError": "Please select a value in this field ",
        },
        "enquiry" : {
            "type": "text",
            "label": "Inquiry",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Purchase Authority",
            "options": [
                {
                    "value": "", 
                    "text": "Please select"
                },
                {
                    "value": "Yes", 
                    "text": "Yes"
                },
                {
                    "value": "No", 
                    "text": "No"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Purchase Timeline",
            "options": [
                {
                    "value": "", 
                    "text": "Please select"
                },
                {
                    "value": "Less than 3 months", 
                    "text": "Less than 3 months"
                },
                {
                    "value": "3 to 6 Months", 
                    "text": "3 to 6 Months"
                },
                {
                    "value": "6 to 12 Months", 
                    "text": "6 to 12 Months"
                },
                {
                    "value": "Over 12 Months", 
                    "text": "Over 12 Months"
                },
            ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Opt-in *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Yes"
                },
                {
                    "value": "no", 
                    "text": "No"
                }
            ],
            "requiredError": "Please select a value for this field",
        },
        "PrivacyText" : [ 
            {
                "value": "GDPR",
                "text": "Your privacy is important to us. Your country provides you rights via the GDPR. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "DPA",
                "text": "Your privacy is important to us. Your country provides you rights via the DPA. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "CCPA",
                "text": "Your privacy is important to us. Your country provides you rights via the CCPA/CPRA. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "CASL",
                "text": "Your privacy is important to us. Your country provides you rights via the CASL. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "LGDP",
                "text": "Your privacy is important to us. Your country provides you rights via the LGPD. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "POPIA",
                "text": "Your privacy is important to us. Your country provides you rights via the POPIA. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "LFPDPPP",
                "text": "Your privacy is important to us. Your country provides you rights via the LFPDPPP. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld and how to remove your data if you wish to."
               },
               {
                "value": "none",
                "text": "Your privacy is important to us. By submitting this form, you accept the terms in our Privacy Policy. Please read it to understand how we ensure your rights are upheld."
               },
        ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*To ensure you receive relevant communications from Eviden relating to our events and offerings please opt-in. You can opt-out at any time."
            },
            {
                "value": "CCPA",
                "text": "By providing your information on this form, you consent to receive communications from Eviden relating to our events and offerings in accordance with our Privacy Policy. You can opt-out at any time."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Submit"
        },
        "ThankYouEmptyDataContent" : "Thank you for your interest.",
        "ThankYouDataContent" : "Thank you for your interest in",
        "DownloadLinkText" : "You can download the report here.",
        "ContactTYText" : "A member of our team will be in touch with you shortly"
    },

    "French": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Langue",
            "options": [
                {
                    "value": "",
                    "text": "Sélectionner"
                   },
                   {
                    "value": "English GB",
                    "text": "Anglais (Royaume-Uni)"
                   },
                   {
                    "value": "English US",
                    "text": "Anglais (États-Unis)"
                   },
                   {
                    "value": "French",
                    "text": "Français"
                   },
                   {
                    "value": "Italian",
                    "text": "Italien"
                   },
                   {
                    "value": "German",
                    "text": "Allemand"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Espagnol (Amérique latine)"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Espagnol (Europe)"
                   },
                   {
                    "value": "Dutch",
                    "text": "Néerlandais"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Portugais (Brésil)"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japonais"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Salutation",
            "options": [
                {
                    "value": "",
                    "text": "Sélectionner"
                   },
                   {
                    "value": "M.",
                    "text": "M."
                   },
                   {
                    "value": "Mme",
                    "text": "Mme"
                   },
                   {
                    "value": "Mlle",
                    "text": "Mlle"
                   },
                   {
                    "value": "Mx.",
                    "text": "Mx."
                   },
                   {
                    "value": "Me/Pr",
                    "text": "Me/Pr"
                   },
                   {
                    "value": "Monsieur",
                    "text": "Monsieur"
                   },
                   {
                    "value": "Docteur",
                    "text": "Docteur"
                   }
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "Prénom *",
            "requiredError": "Ce champ est obligatoire",
            },
        "LastName": {
            "type": "text",
            "label": "Nom *",
            "requiredError": "Ce champ est obligatoire",
            },        
        "Email" : {
            "type": "email",
            "label": "Email professionnel *",
            "requiredError": "Entrer une adresse email valide",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Secteur d’activité *",
            "options": [
                {
                    "value": "",
                    "text": "Sélectionner"
                   },
                   {
                    "value": "Accounting",
                    "text": "Taxation"
                   },
                   {
                    "value": "Airlines/Aviation",
                    "text": "Compagnie aérienne/aviation"
                   },
                   {
                    "value": "Alternative Dispute Resolution",
                    "text": "Résolution des litiges "
                   },
                   {
                    "value": "Alternative Medicine",
                    "text": "Médecine alternative"
                   },
                   {
                    "value": "Animation",
                    "text": "Animation"
                   },
                   {
                    "value": "Apparel & Fashion",
                    "text": "Luxe et textile "
                   },
                   {
                    "value": "Architecture & Planning",
                    "text": "Architecture et planification"
                   },
                   {
                    "value": "Arts and Crafts",
                    "text": "Arts et artisanat"
                   },
                   {
                    "value": "Automotive",
                    "text": "Automobile"
                   },
                   {
                    "value": "Aviation & Aerospace",
                    "text": "Aviation et aéronautique"
                   },
                   {
                    "value": "Banking",
                    "text": "Banque"
                   },
                   {
                    "value": "Biotechnology",
                    "text": "Biotechnologie"
                   },
                   {
                    "value": "Broadcast Media",
                    "text": "Médias/Audiovisuel"
                   },
                   {
                    "value": "Building Materials",
                    "text": "Matériaux de construction"
                   },
                   {
                    "value": "Business Supplies and Equipment",
                    "text": "Fournitures et équipements d’entreprises"
                   },
                   {
                    "value": "Capital Markets",
                    "text": "Marchés de capitaux"
                   },
                   {
                    "value": "Chemicals",
                    "text": "Produits chimiques"
                   },
                   {
                    "value": "Civic & Social Organisation",
                    "text": "Organisation civile et sociale"
                   },
                   {
                    "value": "Civil Engineering",
                    "text": "Génie civil"
                   },
                   {
                    "value": "Commercial Real Estate",
                    "text": "Immobilier commercial"
                   },
                   {
                    "value": "Computer & Network Security",
                    "text": "Sécurité informatique et réseau"
                   },
                   {
                    "value": "Computer Games",
                    "text": "Jeux vidéos "
                   },
                   {
                    "value": "Computer Hardware",
                    "text": "Matériel informatique "
                   },
                   {
                    "value": "Computer Networking",
                    "text": "Mise en réseau informatique"
                   },
                   {
                    "value": "Computer Software",
                    "text": "Logiciel informatique"
                   },
                   {
                    "value": "Construction",
                    "text": "Construction"
                   },
                   {
                    "value": "Consumer Electronics",
                    "text": "Appareils électroniques "
                   },
                   {
                    "value": "Consumer Goods",
                    "text": "Biens de consommation"
                   },
                   {
                    "value": "Consumer Services",
                    "text": "Services aux clients"
                   },
                   {
                    "value": "Cosmetics",
                    "text": "Cosmétiques"
                   },
                   {
                    "value": "Dairy",
                    "text": "Produits laitiers"
                   },
                   {
                    "value": "Defence & Space",
                    "text": "Défense et aérospatial"
                   },
                   {
                    "value": "Design",
                    "text": "Design"
                   },
                   {
                    "value": "Education Management",
                    "text": "Education"
                   },
                   {
                    "value": "E-Learning",
                    "text": "E-learning"
                   },
                   {
                    "value": "Electrical/Electronic Manufacturing",
                    "text": "Production électrique/électronique"
                   },
                   {
                    "value": "Entertainment",
                    "text": "Divertissement"
                   },
                   {
                    "value": "Environmental Services",
                    "text": "Services environnementaux"
                   },
                   {
                    "value": "Events Services",
                    "text": "Evénementiel"
                   },
                   {
                    "value": "Executive Office",
                    "text": "Bureau exécutif"
                   },
                   {
                    "value": "Facilities Services",
                    "text": "Services d’installation"
                   },
                   {
                    "value": "Farming",
                    "text": "Exploitation agricole"
                   },
                   {
                    "value": "Financial Services",
                    "text": "Services financiers"
                   },
                   {
                    "value": "Fine Art",
                    "text": "Beaux-arts"
                   },
                   {
                    "value": "Fishery",
                    "text": "Pêche"
                   },
                   {
                    "value": "Food & Beverages",
                    "text": "Produits alimentaires et boissons"
                   },
                   {
                    "value": "Food Production",
                    "text": "Production alimentaire"
                   },
                   {
                    "value": "Fund-Raising",
                    "text": "Appel de fonds"
                   },
                   {
                    "value": "Furniture",
                    "text": "Ameublement"
                   },
                   {
                    "value": "Gambling & Casinos",
                    "text": "Jeux de hasard et casino"
                   },
                   {
                    "value": "Glass, Ceramics & Concrete",
                    "text": "Verre, céramique et béton"
                   },
                   {
                    "value": "Government Administration",
                    "text": "Administration publique"
                   },
                   {
                    "value": "Government Relations",
                    "text": "Relations gouvernementales"
                   },
                   {
                    "value": "Graphic Design",
                    "text": "Conception graphique"
                   },
                   {
                    "value": "Health, Wellness and Fitness",
                    "text": "Santé, bien-être et remise en forme"
                   },
                   {
                    "value": "Higher Education",
                    "text": "Enseignement supérieur"
                   },
                   {
                    "value": "Hospital & Health Care",
                    "text": "Hôpitaux et établissements de santé"
                   },
                   {
                    "value": "Hospitality",
                    "text": "Hôtellerie"
                   },
                   {
                    "value": "Human Resources",
                    "text": "Ressources humaines"
                   },
                   {
                    "value": "Import and Export",
                    "text": "Importation et exportation"
                   },
                   {
                    "value": "Individual & Family Services",
                    "text": "Services aux personnes et à la famille"
                   },
                   {
                    "value": "Industrial Automation",
                    "text": "Automatisation industrielle"
                   },
                   {
                    "value": "Information Services",
                    "text": "Services d’information"
                   },
                   {
                    "value": "Information Technology and Services",
                    "text": "Technologies et services de l’information"
                   },
                   {
                    "value": "Insurance",
                    "text": "Assurance"
                   },
                   {
                    "value": "International Affairs",
                    "text": "Affaires internationales"
                   },
                   {
                    "value": "International Trade and Development",
                    "text": "Commerce international et développement"
                   },
                   {
                    "value": "Internet",
                    "text": "Internet"
                   },
                   {
                    "value": "Investment Banking",
                    "text": "Banque d’investissement"
                   },
                   {
                    "value": "Investment Management",
                    "text": "Gestion des investissements"
                   },
                   {
                    "value": "Judiciary",
                    "text": "Judiciaire"
                   },
                   {
                    "value": "Law Enforcement",
                    "text": "Application de la loi"
                   },
                   {
                    "value": "Law Practice",
                    "text": "Pratique juridique"
                   },
                   {
                    "value": "Legal Services",
                    "text": "Services juridiques"
                   },
                   {
                    "value": "Legislative Office",
                    "text": "Administration"
                   },
                   {
                    "value": "Leisure, Travel & Tourism",
                    "text": "Loisirs, voyages et tourisme"
                   },
                   {
                    "value": "Libraries",
                    "text": "Bibliothèques"
                   },
                   {
                    "value": "Logistics and Supply Chain",
                    "text": "Logistique et supply chain"
                   },
                   {
                    "value": "Luxury Goods & Jewellery",
                    "text": "Produits et articles de luxe"
                   },
                   {
                    "value": "Machinery",
                    "text": "Machinerie"
                   },
                   {
                    "value": "Management Consulting",
                    "text": "Conseil en management "
                   },
                   {
                    "value": "Maritime",
                    "text": "Maritime"
                   },
                   {
                    "value": "Market Research",
                    "text": "Étude de marché"
                   },
                   {
                    "value": "Marketing and Advertising",
                    "text": "Marketing et publicité"
                   },
                   {
                    "value": "Mechanical or Industrial Engineering",
                    "text": "Génie mécanique ou industriel"
                   },
                   {
                    "value": "Media Production",
                    "text": "Médias production"
                   },
                   {
                    "value": "Medical Devices",
                    "text": "Équipements médicaux"
                   },
                   {
                    "value": "Medical Practice",
                    "text": "Pratique médicale"
                   },
                   {
                    "value": "Mental Health Care",
                    "text": "Soins de santé mentale"
                   },
                   {
                    "value": "Military",
                    "text": "Militaire"
                   },
                   {
                    "value": "Mining & Metals",
                    "text": "Minage et métaux"
                   },
                   {
                    "value": "Mobile Games",
                    "text": "Jeux sur mobile"
                   },
                   {
                    "value": "Motion Pictures and Film",
                    "text": "Film et cinéma"
                   },
                   {
                    "value": "Museums and Institutions",
                    "text": "Musées et institutions"
                   },
                   {
                    "value": "Music",
                    "text": "Musique"
                   },
                   {
                    "value": "Nanotechnology",
                    "text": "Nanotechnologie"
                   },
                   {
                    "value": "Newspapers",
                    "text": "Journaux"
                   },
                   {
                    "value": "Non-Profit Organisation Management",
                    "text": "Management des organismes à but non lucratif"
                   },
                   {
                    "value": "Oil & Energy",
                    "text": "Pétrole et énergie"
                   },
                   {
                    "value": "Online Media",
                    "text": "Médias en ligne"
                   },
                   {
                    "value": "Other",
                    "text": "Autre"
                   },
                   {
                    "value": "Outsourcing/Offshoring",
                    "text": "Outsourcing/Offshoring"
                   },
                   {
                    "value": "Package/Freight Delivery",
                    "text": "Livraison de colis/fret"
                   },
                   {
                    "value": "Packaging and Containers",
                    "text": "Emballage et conteneurs"
                   },
                   {
                    "value": "Paper & Forest Products",
                    "text": "Papier et produits forestiers"
                   },
                   {
                    "value": "Performing Arts",
                    "text": "Arts du spectacle"
                   },
                   {
                    "value": "Pharmaceuticals",
                    "text": "Pharmaceutique"
                   },
                   {
                    "value": "Philanthropy",
                    "text": "Philanthropie"
                   },
                   {
                    "value": "Photography",
                    "text": "Photographie"
                   },
                   {
                    "value": "Plastics",
                    "text": "Plastiques"
                   },
                   {
                    "value": "Political Organisation",
                    "text": "Organisation politique"
                   },
                   {
                    "value": "Primary/Secondary Education",
                    "text": "Enseignement primaire/Enseignement secondaire"
                   },
                   {
                    "value": "Printing",
                    "text": "Impression papier"
                   },
                   {
                    "value": "Professional Training & Coaching",
                    "text": "Formation et encadrement professionnels"
                   },
                   {
                    "value": "Program Development",
                    "text": "Développement de programmes"
                   },
                   {
                    "value": "Public Policy",
                    "text": "Politique publique"
                   },
                   {
                    "value": "Public Relations and Communications",
                    "text": "Relations publiques et communications"
                   },
                   {
                    "value": "Public Safety",
                    "text": "Sécurité publique"
                   },
                   {
                    "value": "Publishing",
                    "text": "Publications"
                   },
                   {
                    "value": "Railroad Manufacture",
                    "text": "Ferroviaire"
                   },
                   {
                    "value": "Ranching",
                    "text": "Élevage"
                   },
                   {
                    "value": "Real Estate",
                    "text": "Immobilier"
                   },
                   {
                    "value": "Recreational Facilities and Services",
                    "text": "Services et installations de loisirs"
                   },
                   {
                    "value": "Religious Institutions",
                    "text": "Institutions religieuses"
                   },
                   {
                    "value": "Renewables & Environment",
                    "text": "Énergies renouvelables et environnement"
                   },
                   {
                    "value": "Research",
                    "text": "Recherche"
                   },
                   {
                    "value": "Restaurants",
                    "text": "Restaurants"
                   },
                   {
                    "value": "Retail",
                    "text": "Vente au détail"
                   },
                   {
                    "value": "Security and Investigations",
                    "text": "Sécurité et enquêtes"
                   },
                   {
                    "value": "Semiconductors",
                    "text": "Semi-conducteurs"
                   },
                   {
                    "value": "Shipbuilding",
                    "text": "Construction navale"
                   },
                   {
                    "value": "Sporting Goods",
                    "text": "Articles de sport"
                   },
                   {
                    "value": "Sports",
                    "text": "Sports"
                   },
                   {
                    "value": "Staffing and Recruiting",
                    "text": "Recrutement"
                   },
                   {
                    "value": "Supermarkets",
                    "text": "Supermarchés"
                   },
                   {
                    "value": "Telecommunications",
                    "text": "Télécommunications"
                   },
                   {
                    "value": "Textiles",
                    "text": "Textiles"
                   },
                   {
                    "value": "Think Tanks",
                    "text": "Groupes de réflexion"
                   },
                   {
                    "value": "Tobacco",
                    "text": "Tabac"
                   },
                   {
                    "value": "Translation and Localisation",
                    "text": "Traduction et localisation"
                   },
                   {
                    "value": "Transportation/Trucking/Railroad",
                    "text": "Transport/camionnage/chemins de fer"
                   },
                   {
                    "value": "Utilities",
                    "text": "Utilities"
                   },
                   {
                    "value": "Venture Capital & Private Equity",
                    "text": "Fonds d'investissement"
                   },
                   {
                    "value": "Veterinary",
                    "text": "Vétérinaire"
                   },
                   {
                    "value": "Warehousing",
                    "text": "Stockage"
                   },
                   {
                    "value": "Wholesale",
                    "text": "Vente en gros"
                   },
                   {
                    "value": "Wine and Spirits",
                    "text": "Vins et spiritueux"
                   },
                   {
                    "value": "Wireless",
                    "text": "Sans fil"
                   },
                   {
                    "value": "Writing and Editing",
                    "text": "Écriture et édition"
                   }
               ],
            "requiredError": "Sélectionner une valeur",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Téléphone professionnel *",
            "requiredError": "Saisir un numéro de téléphone valide",
        },
        "Company" : {
            "type": "text",
            "label": "Nom de la société/de l’organisation *",
            "requiredError": "Ce champ est obligatoire",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Chiffre d’affaires de l’entreprise",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "< 200M€"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "Entre 201M€ et 500M€"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "Entre 501M€ et 1Md€"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "> 1Md€"
                }
               ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Taille d'entreprise",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "< 3 000 employés"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "3 001 à 5 000 employés"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "5 001 à 10 000 employés"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "> 10 001 employés"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "Pays *",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afghanistan"
                },
                {
                 "value": "Aland Islands",
                 "text": "Îles Aland"
                },
                {
                 "value": "Albania",
                 "text": "Albanie"
                },
                {
                 "value": "Algeria",
                 "text": "Algérie"
                },
                {
                 "value": "Andorra",
                 "text": "Andorre"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguilla"
                },
                {
                 "value": "Antarctica",
                 "text": "Antarctique"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua-et-Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentine"
                },
                {
                 "value": "Armenia",
                 "text": "Arménie"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australie"
                },
                {
                 "value": "Austria",
                 "text": "Autriche"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaïdjan"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahreïn"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesh"
                },
                {
                 "value": "Barbados",
                 "text": "Barbade"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Biélorussie"
                },
                {
                 "value": "Belgium",
                 "text": "Belgique"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Bénin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermudes"
                },
                {
                 "value": "Bhutan",
                 "text": "Bhoutan"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivie, État plurinational de"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Saint-Eustache et Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnie-Herzégovine"
                },
                {
                 "value": "Botswana",
                 "text": "Botswana"
                },
                {
                 "value": "Brazil",
                 "text": "Brésil"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Territoire britannique de l'océan Indien"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Îles Vierges britanniques"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgarie"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Cambodge"
                },
                {
                 "value": "Cameroon",
                 "text": "Cameroun"
                },
                {
                 "value": "Canada",
                 "text": "Canada"
                },
                {
                 "value": "Cape Verde",
                 "text": "Cap-Vert"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Îles Caïmans"
                },
                {
                 "value": "Central African Republic",
                 "text": "République centrafricaine"
                },
                {
                 "value": "Chad",
                 "text": "Tchad"
                },
                {
                 "value": "Chile",
                 "text": "Chili"
                },
                {
                 "value": "China",
                 "text": "Chine"
                },
                {
                 "value": "Christmas Island",
                 "text": "Ile Christmas"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Îles Cocos (Keeling)"
                },
                {
                 "value": "Colombia",
                 "text": "Colombie"
                },
                {
                 "value": "Comoros",
                 "text": "Comores"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, République démocratique du"
                },
                {
                 "value": "Cook Islands",
                 "text": "Îles Cook"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Côte d’Ivoire"
                },
                {
                 "value": "Crimea Region",
                 "text": "Région de La Crimée"
                },
                {
                 "value": "Croatia",
                 "text": "Croatie"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Cyprus",
                 "text": "Chypre"
                },
                {
                 "value": "Czech Republic",
                 "text": "République tchèque"
                },
                {
                 "value": "Denmark",
                 "text": "Danemark"
                },
                {
                 "value": "Djibouti",
                 "text": "Djibouti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominique"
                },
                {
                 "value": "Dominican Republic",
                 "text": "République dominicaine"
                },
                {
                 "value": "Ecuador",
                 "text": "Equateur"
                },
                {
                 "value": "Egypt",
                 "text": "Egypte"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Guinée équatoriale"
                },
                {
                 "value": "Eritrea",
                 "text": "Érythrée"
                },
                {
                 "value": "Estonia",
                 "text": "Estonie"
                },
                {
                 "value": "Ethiopia",
                 "text": "Ethiopie"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Îles Malouines"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Îles Féroé"
                },
                {
                 "value": "Fiji",
                 "text": "Fidji"
                },
                {
                 "value": "Finland",
                 "text": "Finlande"
                },
                {
                 "value": "France",
                 "text": "France"
                },
                {
                 "value": "French Guiana",
                 "text": "Guyane française"
                },
                {
                 "value": "French Polynesia",
                 "text": "Polynésie française"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Terres australes et antarctiques françaises"
                },
                {
                 "value": "Gabon",
                 "text": "Gabon"
                },
                {
                 "value": "Gambia",
                 "text": "Gambie"
                },
                {
                 "value": "Georgia",
                 "text": "Géorgie"
                },
                {
                 "value": "Germany",
                 "text": "Allemagne"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Grèce"
                },
                {
                 "value": "Greenland",
                 "text": "Groenland"
                },
                {
                 "value": "Grenada",
                 "text": "Grenade"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadeloupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernesey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinée"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinée-Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haïti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Îles Heard-et-MacDonald"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Vatican"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Hong Kong S.A.R., Chine"
                },
                {
                 "value": "Hungary",
                 "text": "Hongrie"
                },
                {
                 "value": "Iceland",
                 "text": "Islande"
                },
                {
                 "value": "India",
                 "text": "Inde"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonésie"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Iran, République islamique d’"
                },
                {
                 "value": "Iraq",
                 "text": "Irak"
                },
                {
                 "value": "Ireland",
                 "text": "Irlande"
                },
                {
                 "value": "Isle of Man",
                 "text": "Île de Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Italie"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaïque"
                },
                {
                 "value": "Japan",
                 "text": "Japon"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordanie"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazakhstan"
                },
                {
                 "value": "Kenya",
                 "text": "Kenya"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Corée, République populaire démocratique de"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Corée, République de"
                },
                {
                 "value": "Kuwait",
                 "text": "Koweït"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kirghizistan"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "Laos"
                },
                {
                 "value": "Latvia",
                 "text": "Lettonie"
                },
                {
                 "value": "Lebanon",
                 "text": "Liban"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesotho"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Jamahiriya arabe libyenne"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lituanie"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxembourg"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Macao S.A.R., Chine"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macédoine, ancienne république yougoslave de"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malawi"
                },
                {
                 "value": "Malaysia",
                 "text": "Malaisie"
                },
                {
                 "value": "Maldives",
                 "text": "Maldives"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malte"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Îles Marshall"
                },
                {
                 "value": "Martinique",
                 "text": "Martinique"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritanie"
                },
                {
                 "value": "Mauritius",
                 "text": "Maurice"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "Mexique"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronésie, États fédérés de"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldavie, République de"
                },
                {
                 "value": "Monaco",
                 "text": "Monaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolie"
                },
                {
                 "value": "Montenegro",
                 "text": "Monténégro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Maroc"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Myanmar"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "Îles Mariannes du Nord"
                },
                {
                 "value": "Namibia",
                 "text": "Namibie"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Népal"
                },
                {
                 "value": "Netherlands",
                 "text": "Pays-Bas"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Antilles hollandaises"
                },
                {
                 "value": "New Caledonia",
                 "text": "Nouvelle-Calédonie"
                },
                {
                 "value": "New Zealand",
                 "text": "Nouvelle-Zélande"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Niger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Île Norfolk"
                },
                {
                 "value": "North Korea",
                 "text": "Corée du Nord"
                },
                {
                 "value": "Norway",
                 "text": "Norvège"
                },
                {
                 "value": "Oman",
                 "text": "Oman"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistan"
                },
                {
                 "value": "Palau",
                 "text": "Palaos"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Territoires palestiniens occupés"
                },
                {
                 "value": "Panama",
                 "text": "Panama"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papouasie-Nouvelle Guinée"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Pérou"
                },
                {
                 "value": "Philippines",
                 "text": "Philippines"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Pologne"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Porto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Qatar"
                },
                {
                 "value": "Reunion",
                 "text": "Réunion"
                },
                {
                 "value": "Romania",
                 "text": "Roumanie"
                },
                {
                 "value": "Russian Federation",
                 "text": "Fédération de Russie"
                },
                {
                 "value": "Rwanda",
                 "text": "Rwanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "Saint-Barthélemy"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Sainte-Hélène, Ascension et Tristan da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "St-Christophe-et-Niévès"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Sainte-Lucie"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "Saint-Martin (partie française)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "St. Pierre et Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "Saint-Vincent-et-les-Grenadines"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, américaines"
                },
                {
                 "value": "San Marino",
                 "text": "Saint-Marin"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "São Tomé et Príncipe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Arabie Saoudite"
                },
                {
                 "value": "Senegal",
                 "text": "Sénégal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbie"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leone"
                },
                {
                 "value": "Singapore",
                 "text": "Singapour"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint Maarten (partie néerlandaise)"
                },
                {
                 "value": "Slovakia",
                 "text": "Slovaquie"
                },
                {
                 "value": "Slovenia",
                 "text": "Slovénie"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Îles Salomon"
                },
                {
                 "value": "Somalia",
                 "text": "Somalie"
                },
                {
                 "value": "South Africa",
                 "text": "Afrique du Sud"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Géorgie du Sud et îles Sandwich du Sud"
                },
                {
                 "value": "South Sudan",
                 "text": "Soudan du Sud"
                },
                {
                 "value": "Spain",
                 "text": "Espagne"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Soudan"
                },
                {
                 "value": "Suriname",
                 "text": "Suriname"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard et Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Swaziland"
                },
                {
                 "value": "Sweden",
                 "text": "Suède"
                },
                {
                 "value": "Switzerland",
                 "text": "Suisse"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "République arabe syrienne"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tadjikistan"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzanie, République Unie de"
                },
                {
                 "value": "Thailand",
                 "text": "Thaïlande"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor-Leste"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinité-et-Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunisie"
                },
                {
                 "value": "Turkey",
                 "text": "Turquie"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkménistan"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Îles Turques-et-Caïques"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Ouganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ukraine"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Emirats-Arabes-Unis"
                },
                {
                 "value": "United Kingdom",
                 "text": "Royaume-Uni"
                },
                {
                 "value": "United States",
                 "text": "États-Unis"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "Îles mineures éloignées des États-Unis"
                },
                {
                 "value": "Uzbekistan",
                 "text": "Ouzbékistan"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, République bolivarienne du"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Îles Vierges britanniques"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Îles Vierges des États-Unis"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis-et-Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Sahara occidental"
                },
                {
                 "value": "Yemen",
                 "text": "Yémen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambie"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabwe"
                }
               ]
            ,
            "requiredError": "Sélectionner une valeur",
        },
        "State": {
            "type": "select",
            "label": "État *",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "Californie"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Floride"
                },
                {
                 "value": "GA",
                 "text": "Géorgie"
                },
                {
                 "value": "HI",
                 "text": "Hawaï"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiane"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississipi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "New Jersey"
                },
                {
                 "value": "NM",
                 "text": "Nouveau-Mexique"
                },
                {
                 "value": "NY",
                 "text": "New York"
                },
                {
                 "value": "NC",
                 "text": "Caroline du Nord"
                },
                {
                 "value": "ND",
                 "text": "Dakota du Nord"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pennsylvanie"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "Caroline du Sud"
                },
                {
                 "value": "SD",
                 "text": "Dakota du Sud"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginie"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "Virginie-Occidentale"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Sélectionner une valeur",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Fonction",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Comptable/Contrôleur"
                },
                {
                 "value": "Account Manager",
                 "text": "Account manager"
                },
                {
                 "value": "Assistant",
                 "text": "Assistant(e)"
                },
                {
                 "value": "Branch Manager",
                 "text": "Responsable de succursale"
                },
                {
                 "value": "Chairman",
                 "text": "Président"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Responsable de la conformité"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Responsable du numérique"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Président-directeur général"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Directeur financier"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Directeur de l’information"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Directeur marketing"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Directeur médical"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Directeur des opérations"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Directeur des achats"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Directeur des risques"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Directeur de la sécurité"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Directeur de la technologie"
                },
                {
                 "value": "Commercial Director",
                 "text": "Directeur commercial"
                },
                {
                 "value": "Consultant",
                 "text": "Consultant"
                },
                {
                 "value": "Customer Experience",
                 "text": "Expérience client"
                },
                {
                 "value": "Customer Service",
                 "text": "Service client"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Transformation numérique"
                },
                {
                 "value": "Director- General",
                 "text": "Directeur général"
                },
                {
                 "value": "Director - Other",
                 "text": "Directeur - Autre"
                },
                {
                 "value": "Director others",
                 "text": "Directeur autre"
                },
                {
                 "value": "Distribution Director",
                 "text": "Directeur de distribution"
                },
                {
                 "value": "Financial Director",
                 "text": "Directeur financier"
                },
                {
                 "value": "HR Director",
                 "text": "Directeur RH"
                },
                {
                 "value": "HR Manager",
                 "text": "Responsable RH"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "Gestion des applications informatiques"
                },
                {
                 "value": "IT Consulting",
                 "text": "Conseil informatique"
                },
                {
                 "value": "IT Director",
                 "text": "Directeur informatique"
                },
                {
                 "value": "IT Manager",
                 "text": "Responsable informatique"
                },
                {
                 "value": "IT Operations",
                 "text": "Opérations informatiques"
                },
                {
                 "value": "IT Strategy",
                 "text": "Stratégie informatique"
                },
                {
                 "value": "IT System Integration",
                 "text": "Intégration des systèmes informatiques"
                },
                {
                 "value": "Management others",
                 "text": "Management autre"
                },
                {
                 "value": "Managing Director",
                 "text": "Directeur général"
                },
                {
                 "value": "Managing Partner",
                 "text": "Associé directeur"
                },
                {
                 "value": "MarCom Manager",
                 "text": "Directeur marketing et communication"
                },
                {
                 "value": "Marketing Director",
                 "text": "Directeur marketing"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Membre du conseil d’administration"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Membre du conseil de surveillance"
                },
                {
                 "value": "Minister",
                 "text": "Ministre"
                },
                {
                 "value": "Minister of State",
                 "text": "Ministère d’État"
                },
                {
                 "value": "Nursing",
                 "text": "Soins infirmiers"
                },
                {
                 "value": "Operations Director",
                 "text": "Directeur des opérations"
                },
                {
                 "value": "Other",
                 "text": "Autre"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Assistant"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Président du Conseil d’administration"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Président du Conseil de surveillance"
                },
                {
                 "value": "Press",
                 "text": "Presse"
                },
                {
                 "value": "Procurement",
                 "text": "Achats"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Responsable Relations publiques"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Directeur des relations publiques"
                },
                {
                 "value": "Sales Director",
                 "text": "Directeur commercial"
                },
                {
                 "value": "Sales Manager",
                 "text": "Responsable commercial"
                },
                {
                 "value": "Secretary",
                 "text": "Secrétaire"
                },
                {
                 "value": "State Secretary",
                 "text": "Secrétaire d’état"
                },
                {
                 "value": "Supervisor",
                 "text": "Superviseur"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vice-président"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vice-président du conseil d’administration"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vice-président du conseil de surveillance"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Titre du poste",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Produit *",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "IAM solution",
                 "text": "Solution de gestion des identités (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Authentification unique (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Gestionnaire d'authentification forte"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Gouvernance et administration des identités (IGA)"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Gestionnaire d'accès Web (WAM)"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (identité en tant que service)"
                },
                {
                 "value": "High Availability",
                 "text": "Haute disponibilité (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Analyse intelligente des identités"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Autre"
                }
               ],
            "requiredError": "Sélectionner une valeur",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Type de demande *",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "Product Information",
                 "text": "Information"
                },
                {
                 "value": "Price Quote",
                 "text": "Prix"
                },
                {
                 "value": "Demo",
                 "text": "Démonstration"
                },
                {
                 "value": "Free trial package",
                 "text": "Essai"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Formation & Certification"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Demande de renseignement sur nos solutions ou services"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Support produit/client (uniquement pour les clients Eviden actuels)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Comptabilité, facturation ou paiement"
                },
                {
                 "value": "Job Information",
                 "text": "Recrutement/Stage/Alternance"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Presse"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Proposition commerciale à Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Alliance/Partenariat"
                },
                {
                 "value": "Other",
                 "text": "Autre"
                }
               ],
            "requiredError": "Sélectionner une valeur",
        },
        "enquiry" : {
            "type": "text",
            "label": "Demande",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Pouvoir d’achat",
            "options": [
                {
                    "value": "", 
                    "text": "Sélectionner"
                },
                {
                    "value": "Yes", 
                    "text": "Oui"
                },
                {
                    "value": "No", 
                    "text": "Non"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Délai d’achat",
            "options": [
                {
                 "value": "",
                 "text": "Sélectionner"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Moins de 3 mois"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "3 à 6 mois"
                },
                {
                 "value": "6 to 12 months",
                 "text": "6 à 12 mois"
                },
                {
                 "value": "Over 12 months",
                 "text": "Plus de 12 mois"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Consentement aux communications *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Oui"
                },
                {
                    "value": "no", 
                    "text": "Non"
                }
            ],
            "requiredError": "Sélectionner une valeur",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu du RGPD. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "DPA",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu du DPA. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "CCPA",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu du CCPA/CPRA. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "CASL",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu du CASL. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "LGDP",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu de la LGPD. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "POPIA",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu du POPIA. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "LFPDPPP",
             "text": "Votre vie privée est importante pour nous. Votre pays vous donne des droits en vertu du LFPDPPP. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés, et comment supprimer vos données si vous le souhaitez."
            },
            {
             "value": "none",
             "text": "Votre vie privée est importante pour nous. En envoyant ce formulaire, vous acceptez les conditions de notre Politique de confidentialité. Veuillez la lire attentivement afin de comprendre comment nous veillons à ce que vos droits soient respectés."
            }
           ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Pour être informé de nos actualités, innovations, publications et événements, inscrivez-vous ici. Vous pouvez vous désabonner à tout moment."
            },
            {
                "value": "CCPA",
                "text": "En fournissant vos informations dans ce formulaire, vous acceptez de recevoir des communications d’Eviden relatives à nos événements et offres conformément à notre Politique de confidentialité. Vous pouvez vous désabonner à tout moment."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Envoyer"
        },
        "ThankYouEmptyDataContent" : "Merci de votre intérêt.",
        "ThankYouDataContent" : "Merci de l'intérêt que vous portez à",
        "DownloadLinkText" : "Vous pouvez télécharger le rapport ici.",
        "ContactTYText" : "Un membre de notre équipe vous contactera sous peu."
    },

    "Italian": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Lingua preferita",
            "options": [
                {
                    "value": "",
                    "text": "Selezionare"
                   },
                   {
                    "value": "English GB",
                    "text": "Inglese (Regno Unito)"
                   },
                   {
                    "value": "English US",
                    "text": "Inglese (Stati Uniti)"
                   },
                   {
                    "value": "French",
                    "text": "Francese"
                   },
                   {
                    "value": "Italian",
                    "text": "Italiano"
                   },
                   {
                    "value": "German",
                    "text": "Tedesco"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Spagnolo (America Latina)"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Spagnolo (Spagna)"
                   },
                   {
                    "value": "Dutch",
                    "text": "Olandese"
                   },
                   {
                    "value": "Portuguese",
                    "text": "Portoghese"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Portoghese (Brasile)"
                   },
                   {
                    "value": "Japanese",
                    "text": "Giapponese"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Appellativo",
            "options": [
                {
                    "value": "",
                    "text": "Selezionare"
                   },
                   {
                    "value": "Sig.",
                    "text": "Sig."
                   },
                   {
                    "value": "Sig.ra",
                    "text": "Sig.ra"
                   },
                   {
                    "value": "Signorina",
                    "text": "Signorina"
                   },
                   {
                    "value": "Sig.na",
                    "text": "Sig.na"
                   },
                   {
                    "value": "Non specificato",
                    "text": "Non specificato"
                   },
                   {
                    "value": "Master",
                    "text": "Master"
                   },
                   {
                    "value": "Signore",
                    "text": "Signore"
                   },
                   {
                    "value": "Dott.",
                    "text": "Dott."
                   },
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "Nome *",
            "requiredError": "Questo campo è obbligatorio",
            },
        "LastName": {
            "type": "text",
            "label": "Cognome *",
            "requiredError": "Questo campo è obbligatorio",
            },        
        "Email" : {
            "type": "email",
            "label": "Indirizzo e-mail aziendale *",
            "requiredError": "Inserire un indirizzo e-mail valido",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Settore *",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Accounting",
                 "text": "Contabilità"
                },
                {
                 "value": "Airlines/Aviation",
                 "text": "Compagnie aeree/aviazione"
                },
                {
                 "value": "Alternative Dispute Resolution",
                 "text": "Risoluzione alternativa delle controversie"
                },
                {
                 "value": "Alternative Medicine",
                 "text": "Medicina alternativa"
                },
                {
                 "value": "Animation",
                 "text": "Animazione"
                },
                {
                 "value": "Apparel & Fashion",
                 "text": "Abbigliamento e moda"
                },
                {
                 "value": "Architecture & Planning",
                 "text": "Architettura e progettazione"
                },
                {
                 "value": "Arts and Crafts",
                 "text": "Arti e mestieri"
                },
                {
                 "value": "Automotive",
                 "text": "Settore automobilistico"
                },
                {
                 "value": "Aviation & Aerospace",
                 "text": "Aviazione e aerospaziale"
                },
                {
                 "value": "Banking",
                 "text": "Bancario"
                },
                {
                 "value": "Biotechnology",
                 "text": "Biotecnologia"
                },
                {
                 "value": "Broadcast Media",
                 "text": "Mezzi radiotelevisivi"
                },
                {
                 "value": "Building Materials",
                 "text": "Materiali da costruzione"
                },
                {
                 "value": "Business Supplies and Equipment",
                 "text": "Forniture e apparecchiature professionali"
                },
                {
                 "value": "Capital Markets",
                 "text": "Mercati dei capitali"
                },
                {
                 "value": "Chemicals",
                 "text": "Chimico"
                },
                {
                 "value": "Civic & Social Organisation",
                 "text": "Organizzazione civile e sociale"
                },
                {
                 "value": "Civil Engineering",
                 "text": "Ingegneria civile"
                },
                {
                 "value": "Commercial Real Estate",
                 "text": "Immobiliare commerciale"
                },
                {
                 "value": "Computer & Network Security",
                 "text": "Sicurezza informatica e di rete"
                },
                {
                 "value": "Computer Games",
                 "text": "Videogiochi"
                },
                {
                 "value": "Computer Hardware",
                 "text": "Hardware"
                },
                {
                 "value": "Computer Networking",
                 "text": "Reti informatiche"
                },
                {
                 "value": "Computer Software",
                 "text": "Software"
                },
                {
                 "value": "Construction",
                 "text": "Edilizia"
                },
                {
                 "value": "Consumer Electronics",
                 "text": "Elettronica di consumo"
                },
                {
                 "value": "Consumer Goods",
                 "text": "Beni di consumo"
                },
                {
                 "value": "Consumer Services",
                 "text": "Servizi ai consumatori"
                },
                {
                 "value": "Cosmetics",
                 "text": "Cosmetica"
                },
                {
                 "value": "Dairy",
                 "text": "Lattiero-caseario"
                },
                {
                 "value": "Defence & Space",
                 "text": "Difesa e aerospazio"
                },
                {
                 "value": "Design",
                 "text": "Design"
                },
                {
                 "value": "Education Management",
                 "text": "Gestione dell'istruzione"
                },
                {
                 "value": "E-Learning",
                 "text": "E-learning"
                },
                {
                 "value": "Electrical/Electronic Manufacturing",
                 "text": "Prodotti elettrici/elettronici"
                },
                {
                 "value": "Entertainment",
                 "text": "Intrattenimento"
                },
                {
                 "value": "Environmental Services",
                 "text": "Servizi ambientali"
                },
                {
                 "value": "Events Services",
                 "text": "Servizi per eventi"
                },
                {
                 "value": "Executive Office",
                 "text": "Comitato esecutivo"
                },
                {
                 "value": "Facilities Services",
                 "text": "Servizi per infrastrutture"
                },
                {
                 "value": "Farming",
                 "text": "Agricoltura"
                },
                {
                 "value": "Financial Services",
                 "text": "Servizi finanziari"
                },
                {
                 "value": "Fine Art",
                 "text": "Belle Arti"
                },
                {
                 "value": "Fishery",
                 "text": "Pesca"
                },
                {
                 "value": "Food & Beverages",
                 "text": "Prodotti alimentari e bevande"
                },
                {
                 "value": "Food Production",
                 "text": "Produzione di alimenti"
                },
                {
                 "value": "Fund-Raising",
                 "text": "Raccolta fondi"
                },
                {
                 "value": "Furniture",
                 "text": "Mobilio"
                },
                {
                 "value": "Gambling & Casinos",
                 "text": "Case da gioco e casinò"
                },
                {
                 "value": "Glass, Ceramics & Concrete",
                 "text": "Vetro, ceramica e cemento"
                },
                {
                 "value": "Government Administration",
                 "text": "Pubblica amministrazione"
                },
                {
                 "value": "Government Relations",
                 "text": "Relazioni istituzionali"
                },
                {
                 "value": "Graphic Design",
                 "text": "Grafica"
                },
                {
                 "value": "Health, Wellness and Fitness",
                 "text": "Salute, benessere e fitness"
                },
                {
                 "value": "Higher Education",
                 "text": "Istruzione superiore"
                },
                {
                 "value": "Hospital & Health Care",
                 "text": "Ospedali e assistenza sanitaria"
                },
                {
                 "value": "Hospitality",
                 "text": "Ospitalità"
                },
                {
                 "value": "Human Resources",
                 "text": "Risorse Umane"
                },
                {
                 "value": "Import and Export",
                 "text": "Import ed export"
                },
                {
                 "value": "Individual & Family Services",
                 "text": "Servizi familiari e alla persona"
                },
                {
                 "value": "Industrial Automation",
                 "text": "Automazione industriale"
                },
                {
                 "value": "Information Services",
                 "text": "Servizi informatici"
                },
                {
                 "value": "Information Technology and Services",
                 "text": "Tecnologia e servizi informatici"
                },
                {
                 "value": "Insurance",
                 "text": "Assicurazione"
                },
                {
                 "value": "International Affairs",
                 "text": "Affari internazionali"
                },
                {
                 "value": "International Trade and Development",
                 "text": "Commercio e sviluppo internazionali"
                },
                {
                 "value": "Internet",
                 "text": "Internet"
                },
                {
                 "value": "Investment Banking",
                 "text": "Investment banking"
                },
                {
                 "value": "Investment Management",
                 "text": "Gestione degli investimenti"
                },
                {
                 "value": "Judiciary",
                 "text": "Giudiziario"
                },
                {
                 "value": "Law Enforcement",
                 "text": "Applicazione della legge"
                },
                {
                 "value": "Law Practice",
                 "text": "Pratica legale"
                },
                {
                 "value": "Legal Services",
                 "text": "Servizi legali"
                },
                {
                 "value": "Legislative Office",
                 "text": "Ufficio legislativo"
                },
                {
                 "value": "Leisure, Travel & Tourism",
                 "text": "Tempo libero, viaggi e turismo"
                },
                {
                 "value": "Libraries",
                 "text": "Biblioteche"
                },
                {
                 "value": "Logistics and Supply Chain",
                 "text": "Logistica e catena di approvvigionamento"
                },
                {
                 "value": "Luxury Goods & Jewellery",
                 "text": "Beni di lusso e gioielli"
                },
                {
                 "value": "Machinery",
                 "text": "Macchinari"
                },
                {
                 "value": "Management Consulting",
                 "text": "Consulenza gestionale"
                },
                {
                 "value": "Maritime",
                 "text": "Marittimo"
                },
                {
                 "value": "Market Research",
                 "text": "Ricerca di mercato"
                },
                {
                 "value": "Marketing and Advertising",
                 "text": "Marketing e pubblicità"
                },
                {
                 "value": "Mechanical or Industrial Engineering",
                 "text": "Ingegneria meccanica o industriale"
                },
                {
                 "value": "Media Production",
                 "text": "Produzione di media"
                },
                {
                 "value": "Medical Devices",
                 "text": "Dispositivi medici"
                },
                {
                 "value": "Medical Practice",
                 "text": "Pratica medica"
                },
                {
                 "value": "Mental Health Care",
                 "text": "Assistenza psichiatrica"
                },
                {
                 "value": "Military",
                 "text": "Militare"
                },
                {
                 "value": "Mining & Metals",
                 "text": "Minerario e dei metalli"
                },
                {
                 "value": "Mobile Games",
                 "text": "Giochi per cellulari"
                },
                {
                 "value": "Motion Pictures and Film",
                 "text": "Cinematografico e film"
                },
                {
                 "value": "Museums and Institutions",
                 "text": "Musei e istituzioni"
                },
                {
                 "value": "Music",
                 "text": "Musica"
                },
                {
                 "value": "Nanotechnology",
                 "text": "Nanotecnologia"
                },
                {
                 "value": "Newspapers",
                 "text": "Giornali"
                },
                {
                 "value": "Non-Profit Organisation Management",
                 "text": "Gestione delle organizzazioni senza fini di lucro"
                },
                {
                 "value": "Oil & Energy",
                 "text": "Petrolifero ed energetico"
                },
                {
                 "value": "Online Media",
                 "text": "Media online"
                },
                {
                 "value": "Other",
                 "text": "Altro"
                },
                {
                 "value": "Outsourcing/Offshoring",
                 "text": "Esternalizzazione/delocalizzazione"
                },
                {
                 "value": "Package/Freight Delivery",
                 "text": "Imballaggi/trasporto e consegna"
                },
                {
                 "value": "Packaging and Containers",
                 "text": "Imballaggi e container"
                },
                {
                 "value": "Paper & Forest Products",
                 "text": "Carta e prodotti forestali"
                },
                {
                 "value": "Performing Arts",
                 "text": "Arti dello spettacolo"
                },
                {
                 "value": "Pharmaceuticals",
                 "text": "Farmaceutico"
                },
                {
                 "value": "Philanthropy",
                 "text": "Filantropia"
                },
                {
                 "value": "Photography",
                 "text": "Fotografia"
                },
                {
                 "value": "Plastics",
                 "text": "Materie plastiche"
                },
                {
                 "value": "Political Organisation",
                 "text": "Organizzazione politica"
                },
                {
                 "value": "Primary/Secondary Education",
                 "text": "Istruzione primaria/secondaria"
                },
                {
                 "value": "Printing",
                 "text": "Stampa"
                },
                {
                 "value": "Professional Training & Coaching",
                 "text": "Formazione professionale e coaching"
                },
                {
                 "value": "Program Development",
                 "text": "Sviluppo di programmi"
                },
                {
                 "value": "Public Policy",
                 "text": "Ordine pubblico"
                },
                {
                 "value": "Public Relations and Communications",
                 "text": "Relazioni pubbliche e comunicazione"
                },
                {
                 "value": "Public Safety",
                 "text": "Sicurezza pubblica"
                },
                {
                 "value": "Publishing",
                 "text": "Editoria"
                },
                {
                 "value": "Railroad Manufacture",
                 "text": "Costruzioni ferroviarie"
                },
                {
                 "value": "Ranching",
                 "text": "Allevamento"
                },
                {
                 "value": "Real Estate",
                 "text": "Immobiliare"
                },
                {
                 "value": "Recreational Facilities and Services",
                 "text": "Strutture e servizi ricreativi"
                },
                {
                 "value": "Religious Institutions",
                 "text": "Istituzioni religiose"
                },
                {
                 "value": "Renewables & Environment",
                 "text": "Fonti energetiche rinnovabili e ambiente"
                },
                {
                 "value": "Research",
                 "text": "Ricerca"
                },
                {
                 "value": "Restaurants",
                 "text": "Ristoranti"
                },
                {
                 "value": "Retail",
                 "text": "Vendita al dettaglio"
                },
                {
                 "value": "Security and Investigations",
                 "text": "Sicurezza e investigazioni"
                },
                {
                 "value": "Semiconductors",
                 "text": "Semiconduttori"
                },
                {
                 "value": "Shipbuilding",
                 "text": "Costruzioni navali"
                },
                {
                 "value": "Sporting Goods",
                 "text": "Articoli sportivi"
                },
                {
                 "value": "Sports",
                 "text": "Sport"
                },
                {
                 "value": "Staffing and Recruiting",
                 "text": "Selezione e assunzione di personale"
                },
                {
                 "value": "Supermarkets",
                 "text": "Supermercati"
                },
                {
                 "value": "Telecommunications",
                 "text": "Telecomunicazioni"
                },
                {
                 "value": "Textiles",
                 "text": "Tessile"
                },
                {
                 "value": "Think Tanks",
                 "text": "Fabbriche di idee"
                },
                {
                 "value": "Tobacco",
                 "text": "Tabacco"
                },
                {
                 "value": "Translation and Localisation",
                 "text": "Traduzione e localizzazione"
                },
                {
                 "value": "Transportation/Trucking/Railroad",
                 "text": "Trasporti/autotrasporti/ferrovie"
                },
                {
                 "value": "Utilities",
                 "text": "Servizi pubblici"
                },
                {
                 "value": "Venture Capital & Private Equity",
                 "text": "Capitale di rischio e private equity"
                },
                {
                 "value": "Veterinary",
                 "text": "Veterinaria"
                },
                {
                 "value": "Warehousing",
                 "text": "Magazzinaggio"
                },
                {
                 "value": "Wholesale",
                 "text": "Vendita all'ingrosso"
                },
                {
                 "value": "Wine and Spirits",
                 "text": "Vino e liquori"
                },
                {
                 "value": "Wireless",
                 "text": "Radiotelegrafo"
                },
                {
                 "value": "Writing and Editing",
                 "text": "Redazione e revisione"
                }
               ],
            "requiredError": "Selezionare un valore per questo campo",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Telefono aziendale *",
            "requiredError": "Inserire un numero di telefono valido",
        },
        "Company" : {
            "type": "text",
            "label": "Nome azienda/organizzazione *",
            "requiredError": "Questo campo è obbligatorio",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Fatturato dell'azienda",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "Meno di $ 200 milioni"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "Da $ 201 milioni a $ 500 milioni"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "Da $ 501 milioni a $ 1 miliardo"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "Più di $ 1 miliardo"
                }
               ],
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Dimensione dell'azienda",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "Meno di 3.000 dipendenti"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "Da 3.001 a 5.000 dipendenti"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "Da 5.001 a 10.000 dipendenti"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "Più di 10.001 dipendenti"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "Paese *",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afghanistan"
                },
                {
                 "value": "Aland Islands",
                 "text": "Isole Åland"
                },
                {
                 "value": "Albania",
                 "text": "Albania"
                },
                {
                 "value": "Algeria",
                 "text": "Algeria"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguilla"
                },
                {
                 "value": "Antarctica",
                 "text": "Antartide"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua e Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentina"
                },
                {
                 "value": "Armenia",
                 "text": "Armenia"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australia"
                },
                {
                 "value": "Austria",
                 "text": "Austria"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaigian"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahrein"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesh"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Bielorussia"
                },
                {
                 "value": "Belgium",
                 "text": "Belgio"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Benin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermuda"
                },
                {
                 "value": "Bhutan",
                 "text": "Bhutan"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivia, Stato plurinazionale della"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Sint Eustatius e Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnia ed Erzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botswana"
                },
                {
                 "value": "Brazil",
                 "text": "Brasile"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Territorio britannico dell'Oceano Indiano"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Isole Vergini Britanniche"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgaria"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Cambogia"
                },
                {
                 "value": "Cameroon",
                 "text": "Camerun"
                },
                {
                 "value": "Canada",
                 "text": "Canada"
                },
                {
                 "value": "Cape Verde",
                 "text": "Capo Verde"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Isole Cayman"
                },
                {
                 "value": "Central African Republic",
                 "text": "Repubblica Centrafricana"
                },
                {
                 "value": "Chad",
                 "text": "Ciad"
                },
                {
                 "value": "Chile",
                 "text": "Cile"
                },
                {
                 "value": "China",
                 "text": "Cina"
                },
                {
                 "value": "Christmas Island",
                 "text": "Isola di Natale"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Isole Cocos (Keeling)"
                },
                {
                 "value": "Colombia",
                 "text": "Colombia"
                },
                {
                 "value": "Comoros",
                 "text": "Comore"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, Repubblica Democratica del"
                },
                {
                 "value": "Cook Islands",
                 "text": "Isole Cook"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Costa d'Avorio"
                },
                {
                 "value": "Crimea Region",
                 "text": "Repubblica di Crimea"
                },
                {
                 "value": "Croatia",
                 "text": "Croazia"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Cyprus",
                 "text": "Cipro"
                },
                {
                 "value": "Czech Republic",
                 "text": "Repubblica Ceca"
                },
                {
                 "value": "Denmark",
                 "text": "Danimarca"
                },
                {
                 "value": "Djibouti",
                 "text": "Gibuti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "Repubblica Dominicana"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "Egypt",
                 "text": "Egitto"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Guinea Equatoriale"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estonia"
                },
                {
                 "value": "Ethiopia",
                 "text": "Etiopia"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Isole Falkland (Malvinas)"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Isole Faroe"
                },
                {
                 "value": "Fiji",
                 "text": "Figi"
                },
                {
                 "value": "Finland",
                 "text": "Finlandia"
                },
                {
                 "value": "France",
                 "text": "Francia"
                },
                {
                 "value": "French Guiana",
                 "text": "Guiana francese"
                },
                {
                 "value": "French Polynesia",
                 "text": "Polinesia francese"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Terre australi e antartiche francesi"
                },
                {
                 "value": "Gabon",
                 "text": "Gabon"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgia"
                },
                {
                 "value": "Germany",
                 "text": "Germania"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibilterra"
                },
                {
                 "value": "Greece",
                 "text": "Grecia"
                },
                {
                 "value": "Greenland",
                 "text": "Groenlandia"
                },
                {
                 "value": "Grenada",
                 "text": "Grenada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadalupa"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinea Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haiti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Isola Heard e Isole McDonald"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Santa Sede (Stato della Città del Vaticano)"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "RAS di Hong Kong, Cina"
                },
                {
                 "value": "Hungary",
                 "text": "Ungheria"
                },
                {
                 "value": "Iceland",
                 "text": "Islanda"
                },
                {
                 "value": "India",
                 "text": "India"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesia"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Iran, Repubblica Islamica del"
                },
                {
                 "value": "Iraq",
                 "text": "Iraq"
                },
                {
                 "value": "Ireland",
                 "text": "Irlanda"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isola di Man"
                },
                {
                 "value": "Israel",
                 "text": "Israele"
                },
                {
                 "value": "Italy",
                 "text": "Italia"
                },
                {
                 "value": "Jamaica",
                 "text": "Giamaica"
                },
                {
                 "value": "Japan",
                 "text": "Giappone"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Giordania"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazakistan"
                },
                {
                 "value": "Kenya",
                 "text": "Kenia"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Corea, Repubblica Popolare Democratica di"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Corea, Repubblica di"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kirghizistan"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "Repubblica Democratica Popolare del Laos"
                },
                {
                 "value": "Latvia",
                 "text": "Lettonia"
                },
                {
                 "value": "Lebanon",
                 "text": "Libano"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesoto"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Giamahiria Araba Libica"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lituania"
                },
                {
                 "value": "Luxembourg",
                 "text": "Lussemburgo"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "RAS di Macao, Cina"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macedonia, ex Repubblica Jugoslava di"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malawi"
                },
                {
                 "value": "Malaysia",
                 "text": "Malesia"
                },
                {
                 "value": "Maldives",
                 "text": "Maldive"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Isole Marshall"
                },
                {
                 "value": "Martinique",
                 "text": "Martinica"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritania"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauritius"
                },
                {
                 "value": "Mayotte",
                 "text": "Maiotta"
                },
                {
                 "value": "Mexico",
                 "text": "Messico"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronesia, Stati Federati di"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldavia, Repubblica di"
                },
                {
                 "value": "Monaco",
                 "text": "Monaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolia"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Marocco"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambico"
                },
                {
                 "value": "Myanmar",
                 "text": "Birmania"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "Isole Marianne Settentrionali"
                },
                {
                 "value": "Namibia",
                 "text": "Namibia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Paesi Bassi"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Antille Olandesi"
                },
                {
                 "value": "New Caledonia",
                 "text": "Nuova Caledonia"
                },
                {
                 "value": "New Zealand",
                 "text": "Nuova Zelanda"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Niger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Isola Norfolk"
                },
                {
                 "value": "North Korea",
                 "text": "Corea del Nord"
                },
                {
                 "value": "Norway",
                 "text": "Norvegia"
                },
                {
                 "value": "Oman",
                 "text": "Oman"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistan"
                },
                {
                 "value": "Palau",
                 "text": "Palau"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Territorio Palestinese, Occupato"
                },
                {
                 "value": "Panama",
                 "text": "Panama"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papua Nuova Guinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Perù"
                },
                {
                 "value": "Philippines",
                 "text": "Filippine"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Polonia"
                },
                {
                 "value": "Portugal",
                 "text": "Portogallo"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Portorico"
                },
                {
                 "value": "Qatar",
                 "text": "Qatar"
                },
                {
                 "value": "Reunion",
                 "text": "Reunion"
                },
                {
                 "value": "Romania",
                 "text": "Romania"
                },
                {
                 "value": "Russian Federation",
                 "text": "Federazione Russa"
                },
                {
                 "value": "Rwanda",
                 "text": "Ruanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "Saint Barthélemy"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Sant'Elena, Ascensione e Tristano da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "Saint Kitts e Nevis"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Santa Lucia"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "Saint Martin (parte francese)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "Saint Pierre e Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "Saint Vincent e Grenadine"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, Americane"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "São Tomé e Principe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Arabia Saudita"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbia"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leone"
                },
                {
                 "value": "Singapore",
                 "text": "Singapore"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint Maarten (parte olandese)"
                },
                {
                 "value": "Slovakia",
                 "text": "Slovacchia"
                },
                {
                 "value": "Slovenia",
                 "text": "Slovenia"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Isole Salomone"
                },
                {
                 "value": "Somalia",
                 "text": "Somalia"
                },
                {
                 "value": "South Africa",
                 "text": "Sudafrica"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Georgia del Sud e Isole Sandwich Australi"
                },
                {
                 "value": "South Sudan",
                 "text": "Sudan del Sud"
                },
                {
                 "value": "Spain",
                 "text": "Spagna"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Sudan"
                },
                {
                 "value": "Suriname",
                 "text": "Suriname"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard e Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Swaziland"
                },
                {
                 "value": "Sweden",
                 "text": "Svezia"
                },
                {
                 "value": "Switzerland",
                 "text": "Svizzera"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "Repubblica Araba di Siria"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tagikistan"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzania, Repubblica Unita di"
                },
                {
                 "value": "Thailand",
                 "text": "Tailandia"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor Est"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad e Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunisia"
                },
                {
                 "value": "Turkey",
                 "text": "Turchia"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistan"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Isole Turks e Caicos"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ucraina"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Emirati Arabi Uniti"
                },
                {
                 "value": "United Kingdom",
                 "text": "Regno Unito"
                },
                {
                 "value": "United States",
                 "text": "Stati Uniti"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "Isole Minori Esterne degli Stati Uniti d'America"
                },
                {
                 "value": "Uzbekistan",
                 "text": "Uzbekistan"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, Repubblica Bolivariana del"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Isole Vergini, Britanniche"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Isole Vergini americane"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis e Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Sahara Occidentale"
                },
                {
                 "value": "Yemen",
                 "text": "Yemen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabwe"
                }
               ]
            ,
            "requiredError": "Selezionare un valore per questo campo",
        },
        "State": {
            "type": "select",
            "label": "Stato *",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "California"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawaii"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississippi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "New Jersey"
                },
                {
                 "value": "NM",
                 "text": "Nuovo Messico"
                },
                {
                 "value": "NY",
                 "text": "New York"
                },
                {
                 "value": "NC",
                 "text": "Carolina del Nord"
                },
                {
                 "value": "ND",
                 "text": "Dakota del Nord"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pennsylvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "Carolina del Sud"
                },
                {
                 "value": "SD",
                 "text": "Dakota del Sud"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "Virginia Occidentale"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Selezionare un valore per questo campo",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Posizione",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Contabile/controller"
                },
                {
                 "value": "Account Manager",
                 "text": "Account Manager"
                },
                {
                 "value": "Assistant",
                 "text": "Assistente"
                },
                {
                 "value": "Branch Manager",
                 "text": "Direttore di filiale"
                },
                {
                 "value": "Chairman",
                 "text": "Presidente"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Chief Compliance Officer"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Chief Digital Officer"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Amministratore Delegato"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Chief Financial Officer"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Chief Information Officer"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Chief Marketing Officer"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Chief Medical Officer"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Chief Operations Officer"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Chief Procurement Officer"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Chief Risk Officer"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Responsabile della sicurezza"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Chief Technology Officer"
                },
                {
                 "value": "Commercial Director",
                 "text": "Direttore commerciale"
                },
                {
                 "value": "Consultant",
                 "text": "Consulente"
                },
                {
                 "value": "Customer Experience",
                 "text": "Relazioni con i clienti e comunicazione"
                },
                {
                 "value": "Customer Service",
                 "text": "Assistenza clienti"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Trasformazione digitale"
                },
                {
                 "value": "Director- General",
                 "text": "Direttore - Generico"
                },
                {
                 "value": "Director - Other",
                 "text": "Direttore - Altro"
                },
                {
                 "value": "Director others",
                 "text": "Direttore - altri"
                },
                {
                 "value": "Distribution Director",
                 "text": "Direttore Distribuzione"
                },
                {
                 "value": "Financial Director",
                 "text": "Direttore finanziario"
                },
                {
                 "value": "HR Director",
                 "text": "Direttore Risorse umane"
                },
                {
                 "value": "HR Manager",
                 "text": "Responsabile Risorse umane"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "Gestione delle applicazioni informatiche"
                },
                {
                 "value": "IT Consulting",
                 "text": "Consulenza informatica"
                },
                {
                 "value": "IT Director",
                 "text": "Direttore IT"
                },
                {
                 "value": "IT Manager",
                 "text": "Responsabile IT"
                },
                {
                 "value": "IT Operations",
                 "text": "Attività informatiche"
                },
                {
                 "value": "IT Strategy",
                 "text": "Strategia informatica"
                },
                {
                 "value": "IT System Integration",
                 "text": "Integrazione di sistemi informatici"
                },
                {
                 "value": "Management others",
                 "text": "Gestione - altri"
                },
                {
                 "value": "Managing Director",
                 "text": "Consigliere delegato"
                },
                {
                 "value": "Managing Partner",
                 "text": "Socio amministratore"
                },
                {
                 "value": "MarCom Manager",
                 "text": "Direttore MarCom"
                },
                {
                 "value": "Marketing Director",
                 "text": "Direttore marketing"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Membro del Consiglio di Amministrazione"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Membro del Consiglio di vigilanza"
                },
                {
                 "value": "Minister",
                 "text": "Ministro"
                },
                {
                 "value": "Minister of State",
                 "text": "Ministro di Stato"
                },
                {
                 "value": "Nursing",
                 "text": "Assistenza infermieristica"
                },
                {
                 "value": "Operations Director",
                 "text": "Direttore operativo"
                },
                {
                 "value": "Other",
                 "text": "Altro"
                },
                {
                 "value": "PA/Assistant",
                 "text": "Assistente personale/assistente"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Presidente del Consiglio di Amministrazione"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Presidente del Consiglio di vigilanza"
                },
                {
                 "value": "Press",
                 "text": "Stampa"
                },
                {
                 "value": "Procurement",
                 "text": "Approvvigionamento"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Rel. pubbliche Direttore"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Responsabile Relazioni pubbliche"
                },
                {
                 "value": "Sales Director",
                 "text": "Direttore Vendite"
                },
                {
                 "value": "Sales Manager",
                 "text": "Responsabile Vendite"
                },
                {
                 "value": "Secretary",
                 "text": "Segretario"
                },
                {
                 "value": "State Secretary",
                 "text": "Segretario di Stato"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisore"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vicepresidente"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vicepresidente del Consiglio di Amministrazione"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vicepresidente del Consiglio di vigilanza"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Titolo di lavoro",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Prodotto *",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "IAM solution",
                 "text": "Soluzione di gestione delle identità e degli accessi (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Accesso unico (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Gestione dell'autenticazione forte"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Governance e amministrazione delle identità"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Gestione degli accessi Web"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (identità come servizio)"
                },
                {
                 "value": "High Availability",
                 "text": "Alta disponibilità (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Analisi intelligente delle identità"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Altro"
                }
               ],
            "requiredError": "Selezionare un valore per questo campo",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Tipo di richiesta *",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Product Information",
                 "text": "Informazione"
                },
                {
                 "value": "Price Quote",
                 "text": "Prezzo"
                },
                {
                 "value": "Demo",
                 "text": "Dimostrazione"
                },
                {
                 "value": "Free trial package",
                 "text": "Prova"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Formazione e certificazione"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Nuova soluzione o servizi per la tua azienda"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Prodotto/Assistenza clienti (solo client Eviden correnti)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Contabilità, fatturazione o pagamenti"
                },
                {
                 "value": "Job Information",
                 "text": "Informazioni sul lavoro"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Richiesta stampa"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Vendere ad Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Questioni relative ad alleanze/partnership"
                },
                {
                 "value": "Other",
                 "text": "Altro"
                }
               ],
            "requiredError": "Selezionare un valore per questo campo",
        },
        "enquiry" : {
            "type": "text",
            "label": "Richiesta",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Autorità di acquisto",
            "options": [
                {
                    "value": "", 
                    "text": "Selezionare"
                },
                {
                    "value": "Yes", 
                    "text": "Sì"
                },
                {
                    "value": "No", 
                    "text": "No"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Cronologia degli acquisti",
            "options": [
                {
                 "value": "",
                 "text": "Selezionare"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Meno di 3 mesi"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "Da 3 a 6 mesi"
                },
                {
                 "value": "6 to 12 months",
                 "text": "Da 6 a 12 mesi"
                },
                {
                 "value": "Over 12 months",
                 "text": "Oltre 12 mesi"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Consenso alle comunicazioni *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Sì"
                },
                {
                    "value": "no", 
                    "text": "No"
                }
            ],
            "requiredError": "Selezionare un valore per questo campo",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il RGPD. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "DPA",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il DPA. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "CCPA",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il CCPA/CPRA. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "CASL",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il CASL. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "LGDP",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il LGPD. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "POPIA",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il POPIA. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "LFPDPPP",
             "text": "La tua privacy è importante per noi. Il tuo Paese garantisce i tuoi diritti tramite il LFPDPPP. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo il rispetto dei tuoi diritti e come rimuovere i tuoi dati se lo desideri."
            },
            {
             "value": "none",
             "text": "La tua privacy è importante per noi. Inviando questo modulo, accetti le condizioni della nostra Informativa sulla privacy. Leggila per capire in che modo garantiamo che i tuoi diritti siano rispettati."
            }
           ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Iscriviti per ricevere comunicazioni pertinenti da Eviden relative ai nostri eventi e offerte, ti preghiamo di aderire. Potrai annullare l'iscrizione in qualsiasi momento."
            },
            {
                "value": "CCPA",
                "text": "Fornendo le tue informazioni personali in questo modulo, acconsenti a ricevere comunicazioni da Eviden relative ai nostri eventi e offerte in conformità con la nostra Informativa sulla privacy. Potrai annullare l'iscrizione in qualsiasi momento."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Invia"
        },
        "ThankYouEmptyDataContent" : "Grazie per il suo interesse.",
        "ThankYouDataContent" : "Grazie per il suo interesse in",
        "DownloadLinkText" : "Può scaricare il rapporto qui.",
        "ContactTYText" : "Un membro del nostro team si metterà in contatto con lei a breve"
    },

    "German": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Bevorzugte Sprache",
            "options": [
                {
                    "value": "",
                    "text": "Bitte auswählen"
                   },
                   {
                    "value": "English GB",
                    "text": "Englisch (GB)"
                   },
                   {
                    "value": "English US",
                    "text": "Englisch (USA)"
                   },
                   {
                    "value": "French",
                    "text": "Französisch"
                   },
                   {
                    "value": "Italian",
                    "text": "Italienisch"
                   },
                   {
                    "value": "German",
                    "text": "Deutsch"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Spanisch (Lateinamerika)"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Spanisch (Europa)"
                   },
                   {
                    "value": "Dutch",
                    "text": "Niederländisch"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Portugiesisch (Brasilien)"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japanisch"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Anrede",
            "options": [
                {
                    "value": "",
                    "text": "Bitte auswählen"
                   },
                   {
                    "value": "Herr",
                    "text": "Herr"
                   },
                   {
                    "value": "Frau",
                    "text": "Frau"
                   },
                   {
                    "value": "Divers",
                    "text": "Divers"
                   },
                   
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "Vorname *",
            "requiredError": "Dies ist ein Pflichtfeld",
            },
        "LastName": {
            "type": "text",
            "label": "Nachname *",
            "requiredError": "Dies ist ein Pflichtfeld",
            },        
        "Email" : {
            "type": "email",
            "label": "Geschäftliche E-Mail-Adresse *",
            "requiredError": "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Branche *",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Accounting",
                 "text": "Buchhaltung"
                },
                {
                 "value": "Airlines/Aviation",
                 "text": "Fluggesellschaften"
                },
                {
                 "value": "Alternative Dispute Resolution",
                 "text": "Alternative Schlichtungsmethoden"
                },
                {
                 "value": "Alternative Medicine",
                 "text": "Alternative Medizin"
                },
                {
                 "value": "Animation",
                 "text": "Animation"
                },
                {
                 "value": "Apparel & Fashion",
                 "text": "Bekleidung & Mode"
                },
                {
                 "value": "Architecture & Planning",
                 "text": "Architektur und Bauplanung"
                },
                {
                 "value": "Arts and Crafts",
                 "text": "Kunstgewerbe"
                },
                {
                 "value": "Automotive",
                 "text": "Automobil"
                },
                {
                 "value": "Aviation & Aerospace",
                 "text": "Luft- & Raumfahrt"
                },
                {
                 "value": "Banking",
                 "text": "Bankwesen"
                },
                {
                 "value": "Biotechnology",
                 "text": "Biotechnologie"
                },
                {
                 "value": "Broadcast Media",
                 "text": "Rundfunk und Fernsehen"
                },
                {
                 "value": "Building Materials",
                 "text": "Baumaterialien"
                },
                {
                 "value": "Business Supplies and Equipment",
                 "text": "Büromaterial und -ausstattung"
                },
                {
                 "value": "Capital Markets",
                 "text": "Kapitalmärkte"
                },
                {
                 "value": "Chemicals",
                 "text": "Chemie"
                },
                {
                 "value": "Civic & Social Organisation",
                 "text": "Soziale Einrichtungen"
                },
                {
                 "value": "Civil Engineering",
                 "text": "Hoch- und Tiefbau"
                },
                {
                 "value": "Commercial Real Estate",
                 "text": "Gewerbeimmobilien"
                },
                {
                 "value": "Computer & Network Security",
                 "text": "Computer- & Netzwerksicherheit"
                },
                {
                 "value": "Computer Games",
                 "text": "Computerspiele"
                },
                {
                 "value": "Computer Hardware",
                 "text": "Computerhardware"
                },
                {
                 "value": "Computer Networking",
                 "text": "Computernetzwerke"
                },
                {
                 "value": "Computer Software",
                 "text": "Computersoftware"
                },
                {
                 "value": "Construction",
                 "text": "Baugewerbe"
                },
                {
                 "value": "Consumer Electronics",
                 "text": "Unterhaltungselektronik"
                },
                {
                 "value": "Consumer Goods",
                 "text": "Konsumgüter"
                },
                {
                 "value": "Consumer Services",
                 "text": "Verbraucherdienste"
                },
                {
                 "value": "Cosmetics",
                 "text": "Kosmetik"
                },
                {
                 "value": "Dairy",
                 "text": "Milchwirtschaft"
                },
                {
                 "value": "Defence & Space",
                 "text": "Verteidigung & Raumfahrt"
                },
                {
                 "value": "Design",
                 "text": "Design"
                },
                {
                 "value": "Education Management",
                 "text": "Bildungsmanagement"
                },
                {
                 "value": "E-Learning",
                 "text": "E-Learning"
                },
                {
                 "value": "Electrical/Electronic Manufacturing",
                 "text": "Elektro-/Elektronik-Herstellung"
                },
                {
                 "value": "Entertainment",
                 "text": "Unterhaltung"
                },
                {
                 "value": "Environmental Services",
                 "text": "Umweltdienste"
                },
                {
                 "value": "Events Services",
                 "text": "Veranstaltungsdienste"
                },
                {
                 "value": "Executive Office",
                 "text": "Ämter und Behörden"
                },
                {
                 "value": "Facilities Services",
                 "text": "Gebäudeverwaltung"
                },
                {
                 "value": "Farming",
                 "text": "Landwirtschaft"
                },
                {
                 "value": "Financial Services",
                 "text": "Finanzdienstleistungen"
                },
                {
                 "value": "Fine Art",
                 "text": "Bildende Kunst"
                },
                {
                 "value": "Fishery",
                 "text": "Fischereiwirtschaft"
                },
                {
                 "value": "Food & Beverages",
                 "text": "Lebensmittel und Getränke"
                },
                {
                 "value": "Food Production",
                 "text": "Lebensmittelproduktion"
                },
                {
                 "value": "Fund-Raising",
                 "text": "Fundraising"
                },
                {
                 "value": "Furniture",
                 "text": "Möbel"
                },
                {
                 "value": "Gambling & Casinos",
                 "text": "Glücksspiel und Casinos"
                },
                {
                 "value": "Glass, Ceramics & Concrete",
                 "text": "Glas, Keramik und Zement"
                },
                {
                 "value": "Government Administration",
                 "text": "Öffentlicher Dienst"
                },
                {
                 "value": "Government Relations",
                 "text": "Regierungsbeziehungen"
                },
                {
                 "value": "Graphic Design",
                 "text": "Grafikdesign"
                },
                {
                 "value": "Health, Wellness and Fitness",
                 "text": "Gesundheit, Wellness und Fitness"
                },
                {
                 "value": "Higher Education",
                 "text": "Hochschulwesen"
                },
                {
                 "value": "Hospital & Health Care",
                 "text": "Krankenhaus & Gesundheitsbereich"
                },
                {
                 "value": "Hospitality",
                 "text": "Gastgewerbe"
                },
                {
                 "value": "Human Resources",
                 "text": "Personalwesen"
                },
                {
                 "value": "Import and Export",
                 "text": "Import and Export"
                },
                {
                 "value": "Individual & Family Services",
                 "text": "Dienstleistungen für Einzelpersonen und Familien"
                },
                {
                 "value": "Industrial Automation",
                 "text": "Industrielle Automatisierung"
                },
                {
                 "value": "Information Services",
                 "text": "Informationsdienste"
                },
                {
                 "value": "Information Technology and Services",
                 "text": "IT und Services"
                },
                {
                 "value": "Insurance",
                 "text": "Versicherungswesen"
                },
                {
                 "value": "International Affairs",
                 "text": "Beziehung zu Regierungen"
                },
                {
                 "value": "International Trade and Development",
                 "text": "Internationaler Handel und Entwicklung"
                },
                {
                 "value": "Internet",
                 "text": "Internet"
                },
                {
                 "value": "Investment Banking",
                 "text": "Investmentbanking"
                },
                {
                 "value": "Investment Management",
                 "text": "Investitionsmanagement"
                },
                {
                 "value": "Judiciary",
                 "text": "Justiz"
                },
                {
                 "value": "Law Enforcement",
                 "text": "Strafverfolgung"
                },
                {
                 "value": "Law Practice",
                 "text": "Rechtswesen"
                },
                {
                 "value": "Legal Services",
                 "text": "Juristische Dienstleistungen"
                },
                {
                 "value": "Legislative Office",
                 "text": "Legislative"
                },
                {
                 "value": "Leisure, Travel & Tourism",
                 "text": "Tourismus und Freizeit"
                },
                {
                 "value": "Libraries",
                 "text": "Bibliothekswesen"
                },
                {
                 "value": "Logistics and Supply Chain",
                 "text": "Logistik und Beschaffung"
                },
                {
                 "value": "Luxury Goods & Jewellery",
                 "text": "Luxusgüter und Schmuck"
                },
                {
                 "value": "Machinery",
                 "text": "Maschinenbau & Betriebstechnik"
                },
                {
                 "value": "Management Consulting",
                 "text": "Unternehmensberatung"
                },
                {
                 "value": "Maritime",
                 "text": "Seefahrt"
                },
                {
                 "value": "Market Research",
                 "text": "Marktforschung"
                },
                {
                 "value": "Marketing and Advertising",
                 "text": "Marketing und Werbung"
                },
                {
                 "value": "Mechanical or Industrial Engineering",
                 "text": "Maschinenbau oder Wirtschaftsingenieurwesen"
                },
                {
                 "value": "Media Production",
                 "text": "Medienproduktion"
                },
                {
                 "value": "Medical Devices",
                 "text": "Medizintechnik"
                },
                {
                 "value": "Medical Practice",
                 "text": "Humanmedizin"
                },
                {
                 "value": "Mental Health Care",
                 "text": "Psychologie & Psychotherapie"
                },
                {
                 "value": "Military",
                 "text": "Militär"
                },
                {
                 "value": "Mining & Metals",
                 "text": "Bergbau & Metallverarbeitung"
                },
                {
                 "value": "Mobile Games",
                 "text": "Spiele für Mobilgeräte"
                },
                {
                 "value": "Motion Pictures and Film",
                 "text": "Bewegte Bilder und Film"
                },
                {
                 "value": "Museums and Institutions",
                 "text": "Museen und Kulturstätten"
                },
                {
                 "value": "Music",
                 "text": "Musik"
                },
                {
                 "value": "Nanotechnology",
                 "text": "Nanotechnologie"
                },
                {
                 "value": "Newspapers",
                 "text": "Presse"
                },
                {
                 "value": "Non-Profit Organisation Management",
                 "text": "Management von Non-Profit-Organisationen"
                },
                {
                 "value": "Oil & Energy",
                 "text": "Erdöl & Energiewirtschaft"
                },
                {
                 "value": "Online Media",
                 "text": "Online-Medien"
                },
                {
                 "value": "Other",
                 "text": "Sonstiges"
                },
                {
                 "value": "Outsourcing/Offshoring",
                 "text": "Outsourcing & Offshoring"
                },
                {
                 "value": "Package/Freight Delivery",
                 "text": "Verpackung/Frachtlieferung"
                },
                {
                 "value": "Packaging and Containers",
                 "text": "Verpackungsindustrie"
                },
                {
                 "value": "Paper & Forest Products",
                 "text": "Papier & Forstprodukte"
                },
                {
                 "value": "Performing Arts",
                 "text": "Darstellende Künste"
                },
                {
                 "value": "Pharmaceuticals",
                 "text": "Pharmazie"
                },
                {
                 "value": "Philanthropy",
                 "text": "Philanthropie"
                },
                {
                 "value": "Photography",
                 "text": "Fotografie"
                },
                {
                 "value": "Plastics",
                 "text": "Kunststoffe"
                },
                {
                 "value": "Political Organisation",
                 "text": "Politische Organisationen"
                },
                {
                 "value": "Primary/Secondary Education",
                 "text": "Bildung und Fortbildung"
                },
                {
                 "value": "Printing",
                 "text": "Druckwesen"
                },
                {
                 "value": "Professional Training & Coaching",
                 "text": "Professionelles Training und Coaching"
                },
                {
                 "value": "Program Development",
                 "text": "Programmentwicklung"
                },
                {
                 "value": "Public Policy",
                 "text": "Öffentliche Ordnung"
                },
                {
                 "value": "Public Relations and Communications",
                 "text": "Öffentlichkeitsarbeit und Kommunikation"
                },
                {
                 "value": "Public Safety",
                 "text": "Öffentliche Sicherheit"
                },
                {
                 "value": "Publishing",
                 "text": "Verlagswesen"
                },
                {
                 "value": "Railroad Manufacture",
                 "text": "Eisenbahnbau"
                },
                {
                 "value": "Ranching",
                 "text": "Viehwirtschaft"
                },
                {
                 "value": "Real Estate",
                 "text": "Immobilien"
                },
                {
                 "value": "Recreational Facilities and Services",
                 "text": "Freizeiteinrichtungen & -dienste"
                },
                {
                 "value": "Religious Institutions",
                 "text": "Religiöse Einrichtungen"
                },
                {
                 "value": "Renewables & Environment",
                 "text": "Erneuerbare Energie & Umwelt"
                },
                {
                 "value": "Research",
                 "text": "Forschung"
                },
                {
                 "value": "Restaurants",
                 "text": "Restaurants"
                },
                {
                 "value": "Retail",
                 "text": "Einzelhandel"
                },
                {
                 "value": "Security and Investigations",
                 "text": "Sicherheit und Detektei"
                },
                {
                 "value": "Semiconductors",
                 "text": "Halbleiter"
                },
                {
                 "value": "Shipbuilding",
                 "text": "Schiffbau"
                },
                {
                 "value": "Sporting Goods",
                 "text": "Sportartikel"
                },
                {
                 "value": "Sports",
                 "text": "Sport"
                },
                {
                 "value": "Staffing and Recruiting",
                 "text": "Personalberatung & -vermittlung"
                },
                {
                 "value": "Supermarkets",
                 "text": "Supermärkte"
                },
                {
                 "value": "Telecommunications",
                 "text": "Telekommunikation"
                },
                {
                 "value": "Textiles",
                 "text": "Textilien"
                },
                {
                 "value": "Think Tanks",
                 "text": "Think Tanks"
                },
                {
                 "value": "Tobacco",
                 "text": "Tabak"
                },
                {
                 "value": "Translation and Localisation",
                 "text": "Übersetzung und Lokalisierung"
                },
                {
                 "value": "Transportation/Trucking/Railroad",
                 "text": "Verkehrsmittel/Gütertransport/Eisenbahn"
                },
                {
                 "value": "Utilities",
                 "text": "Energieversorgung"
                },
                {
                 "value": "Venture Capital & Private Equity",
                 "text": "Beteiligungs- und Risikokapital"
                },
                {
                 "value": "Veterinary",
                 "text": "Tiermedizin"
                },
                {
                 "value": "Warehousing",
                 "text": "Lagerhaltung"
                },
                {
                 "value": "Wholesale",
                 "text": "Großhandel"
                },
                {
                 "value": "Wine and Spirits",
                 "text": "Weine und Spirituosen"
                },
                {
                 "value": "Wireless",
                 "text": "Wireless"
                },
                {
                 "value": "Writing and Editing",
                 "text": "Schreiben und Redigieren"
                }
               ],
            "requiredError": "Bitte wählen Sie einen Wert für dieses Feld",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Telefon geschäftlich *",
            "requiredError": "Bitte geben Sie eine gültige Telefonnummer ein",
        },
        "Company" : {
            "type": "text",
            "label": "Name des Unternehmens/der Organisation *",
            "requiredError": "Dies ist ein Pflichtfeld",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Unternehmensumsatz",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "< als 200 Mio. Euro"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "201 bis 500 Mio. Euro"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "501 Mio. bis 1 Mrd. Euro"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "> als 1 Mrd. Euro"
                }
               ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Unternehmensgröße",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "Weniger als 3.000 Mitarbeiter"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "3.001 bis 5.000 Mitarbeiter"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "5.001 bis 10.000 Mitarbeiter"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "Mehr als 10.001 Mitarbeiter"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "Land *",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afghanistan"
                },
                {
                 "value": "Egypt",
                 "text": "Ägypten"
                },
                {
                 "value": "Aland Islands",
                 "text": "Aland-Inseln"
                },
                {
                 "value": "Albania",
                 "text": "Albanien"
                },
                {
                 "value": "Algeria",
                 "text": "Algerien"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguilla"
                },
                {
                 "value": "Antarctica",
                 "text": "Antarktis"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua und Barbados"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Äquatorialguinea"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "Arabische Republik Syrien"
                },
                {
                 "value": "Argentina",
                 "text": "Argentinien"
                },
                {
                 "value": "Armenia",
                 "text": "Armenien"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Aserbaidschan"
                },
                {
                 "value": "Ethiopia",
                 "text": "Äthiopien"
                },
                {
                 "value": "Australia",
                 "text": "Australien"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahrain"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesch"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Belarus"
                },
                {
                 "value": "Belgium",
                 "text": "Belgien"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Benin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermuda"
                },
                {
                 "value": "Bhutan",
                 "text": "Bhutan"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivien, Plurinationaler Staat"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Sint Eustatius und Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnien und Herzegowina"
                },
                {
                 "value": "Botswana",
                 "text": "Botswana"
                },
                {
                 "value": "Brazil",
                 "text": "Brasilien"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Britische Virgin Islands"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Britisches Territorium im Indischen Ozean"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgarien"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Chile",
                 "text": "Chile"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Cook Islands",
                 "text": "Cook-Inseln"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Cote d'Ivoire"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Denmark",
                 "text": "Dänemark"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "Demokratische Volksrepublik Laos"
                },
                {
                 "value": "Germany",
                 "text": "Deutschland"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "Dominikanische Republik"
                },
                {
                 "value": "Djibouti",
                 "text": "Dschibuti"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estland"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Falklandinseln (Malwinen)"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Färöer Inseln"
                },
                {
                 "value": "Fiji",
                 "text": "Fidschi"
                },
                {
                 "value": "Finland",
                 "text": "Finnland"
                },
                {
                 "value": "France",
                 "text": "Frankreich"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Französische Süd-Territorien"
                },
                {
                 "value": "French Guiana",
                 "text": "Französisch-Guayana"
                },
                {
                 "value": "French Polynesia",
                 "text": "Französisch-Polynesien"
                },
                {
                 "value": "Gabon",
                 "text": "Gabon"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgien"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Grenada",
                 "text": "Grenada"
                },
                {
                 "value": "Greece",
                 "text": "Griechenland"
                },
                {
                 "value": "Greenland",
                 "text": "Grönland"
                },
                {
                 "value": "United Kingdom",
                 "text": "Großbritannien"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadeloupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinea-Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haiti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Heard-Insel und McDonald-Inseln"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Hongkong SAR, China"
                },
                {
                 "value": "India",
                 "text": "Indien"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesien"
                },
                {
                 "value": "Iraq",
                 "text": "Irak"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Iran, Islamische Republik"
                },
                {
                 "value": "Ireland",
                 "text": "Irland"
                },
                {
                 "value": "Iceland",
                 "text": "Island"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isle of Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Italien"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaika"
                },
                {
                 "value": "Japan",
                 "text": "Japan"
                },
                {
                 "value": "Yemen",
                 "text": "Jemen"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordanien"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Jungferninseln, Britisch"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Jungferninseln, US"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Kaimaninseln"
                },
                {
                 "value": "Cambodia",
                 "text": "Kambodscha"
                },
                {
                 "value": "Cameroon",
                 "text": "Kamerun"
                },
                {
                 "value": "Canada",
                 "text": "Kanada"
                },
                {
                 "value": "Cape Verde",
                 "text": "Kap Verde"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kasachstan"
                },
                {
                 "value": "Qatar",
                 "text": "Katar"
                },
                {
                 "value": "Kenya",
                 "text": "Kenia"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kirgisistan"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Kokosinseln (Keelinginseln)"
                },
                {
                 "value": "Colombia",
                 "text": "Kolumbien"
                },
                {
                 "value": "Comoros",
                 "text": "Komoren"
                },
                {
                 "value": "Congo",
                 "text": "Kongo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Kongo, Demokratische Republik"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Korea, Demokratische Volksrepublik"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Korea, Republik"
                },
                {
                 "value": "Crimea Region",
                 "text": "Krimregion"
                },
                {
                 "value": "Croatia",
                 "text": "Kroatien"
                },
                {
                 "value": "Cuba",
                 "text": "Kuba"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesotho"
                },
                {
                 "value": "Latvia",
                 "text": "Lettland"
                },
                {
                 "value": "Lebanon",
                 "text": "Libanon"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Libyen"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Litauen"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxemburg"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Macao SAR, China"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagaskar"
                },
                {
                 "value": "Malawi",
                 "text": "Malawi"
                },
                {
                 "value": "Malaysia",
                 "text": "Malaysia"
                },
                {
                 "value": "Maldives",
                 "text": "Malediven"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Morocco",
                 "text": "Marokko"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Marshallinseln"
                },
                {
                 "value": "Martinique",
                 "text": "Martinique"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauretanien"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauritius"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Mazedonien, ehemalige jugoslawische Republik"
                },
                {
                 "value": "Mexico",
                 "text": "Mexiko"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Mikronesien, Föderierte Staaten von"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldawien, Republik"
                },
                {
                 "value": "Monaco",
                 "text": "Monaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolei"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Mozambique",
                 "text": "Mosambik"
                },
                {
                 "value": "Myanmar",
                 "text": "Myanmar"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "N.-Marianen-Insel"
                },
                {
                 "value": "Namibia",
                 "text": "Namibia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "New Caledonia",
                 "text": "Neukaledonien"
                },
                {
                 "value": "New Zealand",
                 "text": "Neuseeland"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Netherlands",
                 "text": "Niederlande"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Niederländische Antillen"
                },
                {
                 "value": "Niger",
                 "text": "Niger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "North Korea",
                 "text": "Nordkorea"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Norfolkinsel"
                },
                {
                 "value": "Norway",
                 "text": "Norwegen"
                },
                {
                 "value": "Oman",
                 "text": "Oman"
                },
                {
                 "value": "Austria",
                 "text": "Österreich"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistan"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Palästinensische Gebiete, Besetzt"
                },
                {
                 "value": "Palau",
                 "text": "Palau"
                },
                {
                 "value": "Panama",
                 "text": "Panama"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papua-Neuguinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Peru"
                },
                {
                 "value": "Philippines",
                 "text": "Philippinen"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Polen"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Puerto Rico"
                },
                {
                 "value": "Reunion",
                 "text": "Reunion"
                },
                {
                 "value": "Rwanda",
                 "text": "Ruanda"
                },
                {
                 "value": "Romania",
                 "text": "Rumänien"
                },
                {
                 "value": "Russian Federation",
                 "text": "Russische Föderation"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Salomoninseln"
                },
                {
                 "value": "Zambia",
                 "text": "Sambia"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, Amerikanisch"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "Sao Tome und Principe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Saudi Arabien"
                },
                {
                 "value": "Sweden",
                 "text": "Schweden"
                },
                {
                 "value": "Switzerland",
                 "text": "Schweiz"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbien"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychellen"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leone"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Simbabwe"
                },
                {
                 "value": "Singapore",
                 "text": "Singapur"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint Maarten (Niederländischer Teil)"
                },
                {
                 "value": "Slovakia",
                 "text": "Slowakei"
                },
                {
                 "value": "Slovenia",
                 "text": "Slowenien"
                },
                {
                 "value": "Somalia",
                 "text": "Somalia"
                },
                {
                 "value": "Spain",
                 "text": "Spanien"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "St. Barthélemy"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "St. Helena, Ascension und Tristan da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "St. Kitts und Nevis"
                },
                {
                 "value": "Saint Lucia",
                 "text": "St. Lucia"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "St. Martin (französischer Teil)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "St. Pierre und Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "St. Vincent und die Grenadinen"
                },
                {
                 "value": "South Africa",
                 "text": "Südafrika"
                },
                {
                 "value": "Sudan",
                 "text": "Sudan"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Südgeorgien und Südliche Sandwichinseln"
                },
                {
                 "value": "South Sudan",
                 "text": "Südsudan"
                },
                {
                 "value": "Suriname",
                 "text": "Surinam"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard und Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Swasiland"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tadschikistan"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tansania, Vereinigte Republik"
                },
                {
                 "value": "Thailand",
                 "text": "Thailand"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor-Leste"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad und Tobago"
                },
                {
                 "value": "Chad",
                 "text": "Tschad"
                },
                {
                 "value": "Czech Republic",
                 "text": "Tschechische Republik"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunesien"
                },
                {
                 "value": "Turkey",
                 "text": "Türkei"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistan"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Turks- und Caicosinseln"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ukraine"
                },
                {
                 "value": "Hungary",
                 "text": "Ungarn"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "US Minor Outl.Isl."
                },
                {
                 "value": "Uzbekistan",
                 "text": "Usbekistan"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Vatikanstadt"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, Bolivarische Republik"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Vereinigte Arabische Emirate"
                },
                {
                 "value": "United States",
                 "text": "Vereinigte Staaten"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnam"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis und Futuna"
                },
                {
                 "value": "Christmas Island",
                 "text": "Weihnachtsinsel"
                },
                {
                 "value": "Western Sahara",
                 "text": "Westsahara"
                },
                {
                 "value": "Central African Republic",
                 "text": "Zentralafrikanische Republik"
                },
                {
                 "value": "Cyprus",
                 "text": "Zypern"
                }
               ]
            ,
            "requiredError": "Bitte wählen Sie einen Wert für dieses Feld",
        },
        "State": {
            "type": "select",
            "label": "Zustand *",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "Kalifornien"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawaii"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississippi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "New Jersey"
                },
                {
                 "value": "NM",
                 "text": "New Mexico"
                },
                {
                 "value": "NY",
                 "text": "New York"
                },
                {
                 "value": "NC",
                 "text": "North Carolina"
                },
                {
                 "value": "ND",
                 "text": "North Dakota"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pennsylvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "South Carolina"
                },
                {
                 "value": "SD",
                 "text": "South Dakota"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "West Virginia"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Bitte wählen Sie einen Wert für dieses Feld",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Berufliche Funktion",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Buchhalter/Controller"
                },
                {
                 "value": "Account Manager",
                 "text": "Account Manager"
                },
                {
                 "value": "Assistant",
                 "text": "Assistant"
                },
                {
                 "value": "Branch Manager",
                 "text": "Niederlassungsleiter"
                },
                {
                 "value": "Chairman",
                 "text": "Chairman"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Chief Compliance Officer"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Chief Digital Officer"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Chief Executive Officer"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Chief Financial Officer"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Chief Information Officer"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Chief Marketing Officer"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Chief Medical Officer"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Chief Operations Officer"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Chief Procurement Officer"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Chief Risk Officer"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Chief Security Officer"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Chief Technology Officer"
                },
                {
                 "value": "Commercial Director",
                 "text": "Kaufmännische Leitung"
                },
                {
                 "value": "Consultant",
                 "text": "Consultant"
                },
                {
                 "value": "Customer Experience",
                 "text": "Customer Experience Manager"
                },
                {
                 "value": "Customer Service",
                 "text": "Kundendienst"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Manager Digitale Transformation"
                },
                {
                 "value": "Director- General",
                 "text": "Leitung - Allgemein"
                },
                {
                 "value": "Director - Other",
                 "text": "Leitung - Sonstige"
                },
                {
                 "value": "Director others",
                 "text": "Leitung sonstige"
                },
                {
                 "value": "Distribution Director",
                 "text": "Vertriebsleiter"
                },
                {
                 "value": "Financial Director",
                 "text": "Finanzdirektor"
                },
                {
                 "value": "HR Director",
                 "text": "Personalleiter"
                },
                {
                 "value": "HR Manager",
                 "text": "Personalmanager"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "IT-Anwendungsmanagement"
                },
                {
                 "value": "IT Consulting",
                 "text": "IT-Beratung"
                },
                {
                 "value": "IT Director",
                 "text": "IT-Direktor"
                },
                {
                 "value": "IT Manager",
                 "text": "IT-Manager"
                },
                {
                 "value": "IT Operations",
                 "text": "IT Operations"
                },
                {
                 "value": "IT Strategy",
                 "text": "IT-Strategie"
                },
                {
                 "value": "IT System Integration",
                 "text": "IT-Systemintegration"
                },
                {
                 "value": "Management others",
                 "text": "Management sonstige"
                },
                {
                 "value": "Managing Director",
                 "text": "Geschäftsführer"
                },
                {
                 "value": "Managing Partner",
                 "text": "Managing Partner"
                },
                {
                 "value": "MarCom Manager",
                 "text": "MarCom-Manager"
                },
                {
                 "value": "Marketing Director",
                 "text": "Marketingleiter"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Verwaltungsratsmitglied"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Mitglied des Aufsichtsrats"
                },
                {
                 "value": "Minister",
                 "text": "Minister"
                },
                {
                 "value": "Minister of State",
                 "text": "Staatsminister"
                },
                {
                 "value": "Nursing",
                 "text": "Krankenpflege"
                },
                {
                 "value": "Operations Director",
                 "text": "Betriebsleiter"
                },
                {
                 "value": "Other",
                 "text": "Sonstiges"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Assistent"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Vorsitzender des Verwaltungsrats"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Aufsichtsratsvorsitzender"
                },
                {
                 "value": "Press",
                 "text": "Presse"
                },
                {
                 "value": "Procurement",
                 "text": "Einkauf"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Public Relations Manager"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Public Relations Manager"
                },
                {
                 "value": "Sales Director",
                 "text": "Verkaufsdirektor"
                },
                {
                 "value": "Sales Manager",
                 "text": "Verkaufsleiter"
                },
                {
                 "value": "Secretary",
                 "text": "Sekretärin"
                },
                {
                 "value": "State Secretary",
                 "text": "Staatssekretär"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisor"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Stellvertretender Vorsitzender"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vizepräsident des Verwaltungsrats"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Stellvertretender Vorsitzender des Aufsichtsrates"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Berufsbezeichnung",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Produkt *",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "IAM solution",
                 "text": "Identitäts- und Zugriffsmanagement (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Einmalanmeldung (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Verwaltung starker Authentifizierung"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Identitätsgovernance und -verwaltung"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Web-Zugriffsverwaltung"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (Identität als Dienst)"
                },
                {
                 "value": "High Availability",
                 "text": "Hochverfügbarkeit (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Intelligente Identitätsanalyse"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Sonstiges"
                }
               ],
            "requiredError": "Bitte wählen Sie einen Wert für dieses Feld",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Anfragetyp *",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Product Information",
                 "text": "Information"
                },
                {
                 "value": "Price Quote",
                 "text": "Preis"
                },
                {
                 "value": "Demo",
                 "text": "Demonstration"
                },
                {
                 "value": "Free trial package",
                 "text": "Testversion"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Schulung & Zertifizierung"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Neue Lösung oder Services für Ihr Unternehmen"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Produkt-/Kundensupport (nur für bestehende Eviden-Kunden)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Buchhaltung, Abrechnung oder Zahlungen"
                },
                {
                 "value": "Job Information",
                 "text": "Jobinformationen"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Presseanfrage"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Verkauf an Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Allianz-/Partnerschaftsangelegenheiten"
                },
                {
                 "value": "Other",
                 "text": "Sonstiges"
                }
               ],
            "requiredError": "Bitte wählen Sie einen Wert für dieses Feld",
        },
        "enquiry" : {
            "type": "text",
            "label": "Anfrage",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Einkaufsbefugnis",
            "options": [
                {
                    "value": "", 
                    "text": "Bitte auswählen"
                },
                {
                    "value": "Yes", 
                    "text": "Ja"
                },
                {
                    "value": "No", 
                    "text": "Nein"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Zeithorizont für den Kauf",
            "options": [
                {
                 "value": "",
                 "text": "Bitte auswählen"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Weniger als 3 Monate"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "3 bis 6 Monate"
                },
                {
                 "value": "6 to 12 months",
                 "text": "6 bis 12 Monate"
                },
                {
                 "value": "Over 12 months",
                 "text": "Mehr als 12 Monate"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Einwilligung zum Erhalt von Mitteilungen *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Ja"
                },
                {
                    "value": "no", 
                    "text": "Nein"
                }
            ],
            "requiredError": "Bitte wählen Sie einen Wert für dieses Feld",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen der DSGVO. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Dort erfahren Sie, wie Sie Ihre Rechte wahrnehmen und wie Sie Ihre Daten löschen lassen können, wenn Sie dies wünschen."
            },
            {
             "value": "DPA",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen der DPA. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Dort erfahren Sie, wie Sie Ihre Rechte wahrnehmen und wie Sie Ihre Daten löschen lassen können, wenn Sie dies wünschen."
            },
            {
             "value": "CCPA",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen des CCPA/CPRA. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Bitte lesen Sie es, um zu verstehen, wie wir sicherstellen, dass Ihre Rechte gewahrt werden, und wie Sie Ihre Daten löschen können, wenn Sie dies wünschen."
            },
            {
             "value": "CASL",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen des CASL. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Bitte lesen Sie es, um zu verstehen, wie wir sicherstellen, dass Ihre Rechte gewahrt werden, und wie Sie Ihre Daten löschen können, wenn Sie dies wünschen."
            },
            {
             "value": "LGDP",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen der LGPD. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Bitte lesen Sie es, um zu verstehen, wie wir sicherstellen, dass Ihre Rechte gewahrt werden, und wie Sie Ihre Daten löschen können, wenn Sie dies wünschen."
            },
            {
             "value": "POPIA",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen der POPIA. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Bitte lesen Sie es, um zu verstehen, wie wir sicherstellen, dass Ihre Rechte gewahrt werden, und wie Sie Ihre Daten löschen können, wenn Sie dies wünschen."
            },
            {
             "value": "LFPDPPP",
             "text": "Ihre Privatsphäre ist uns wichtig. Ihr Land gewährt Ihnen Rechte im Rahmen des LFPDPPP. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Bitte lesen Sie es, um zu verstehen, wie wir sicherstellen, dass Ihre Rechte gewahrt werden, und wie Sie Ihre Daten löschen können, wenn Sie dies wünschen."
            },
            {
             "value": "none",
             "text": "Ihre Privatsphäre ist uns wichtig. Mit dem Absenden dieses Formulars akzeptieren Sie die Bedingungen in unserer Datenschutzrichtlinie. Bitte lesen Sie sie, um zu verstehen, wie wir die Wahrung Ihrer Rechte sicherstellen."
            }
           ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Wir möchten Ihnen in unregelmäßigen Abständen für Sie relevante Informationen zu unseren Veranstaltungen und Angeboten senden. Sie können diese Mitteilungen jederzeit abbestellen."
            },
            {
                "value": "CCPA",
                "text": "Indem Sie Ihre Informationen in diesem Formular angeben, stimmen Sie zu, Mitteilungen von Eviden in Bezug auf unsere Veranstaltungen und Angebote gemäß unserer Datenschutzrichtlinie zu erhalten. Sie können sich jederzeit abmelden."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Absenden"
        },
        "ThankYouEmptyDataContent" : "Vielen Dank für Ihr Interesse.",
        "ThankYouDataContent" : "Wir danken Ihnen für Ihr Interesse an",
        "DownloadLinkText" : "Sie können den Bericht hier herunterladen.",
        "ContactTYText" : "Ein Mitglied unseres Teams wird sich in Kürze mit Ihnen in Verbindung setzen."
    },

    "European Spanish": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Idioma preferido",
            "options": [
                {
                    "value": "",
                    "text": "Seleccione"
                   },
                   {
                    "value": "English GB",
                    "text": "Inglés-GB"
                   },
                   {
                    "value": "English US",
                    "text": "Inglés-US"
                   },
                   {
                    "value": "French",
                    "text": "Francés"
                   },
                   {
                    "value": "Italian",
                    "text": "Italiano"
                   },
                   {
                    "value": "German",
                    "text": "Alemán"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Español latinoamericano"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Español europeo"
                   },
                   {
                    "value": "Dutch",
                    "text": "Neerlandés"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Portugués brasileño"
                   },
                   {
                    "value": "Japanese",
                    "text": ""
                   }
            ]
            },
            "Salutation" : {
                "type": "select",
                "label": "Japonés",
                "options": [
                    {
                        "value": "", 
                        "text": "Seleccione"
                    },
                    {
                        "value": "Sr.", 
                        "text": "Sr."
                    },
                    {
                        "value": "Sra.", 
                        "text": "Sra."
                    },
                    {
                        "value": "Srta.", 
                        "text": "Srta."
                    },
                    {
                        "value": "Sx.", 
                        "text": "Sx."
                    },                               
                    {
                        "value": "Master", 
                        "text": "Master"
                    },                
                    {
                        "value": "Señor", 
                        "text": "Señor"
                    },               
                    {
                        "value": "Dr.", 
                        "text": "Dr."
                    },
                ]
                },
        "FirstName": {
            "type": "text",
            "label": "Nombre *",
            "requiredError": "El campo es obligatorio",
            },
        "LastName": {
            "type": "text",
            "label": "Apellido *",
            "requiredError": "El campo es obligatorio",
            },        
        "Email" : {
            "type": "email",
            "label": "Dirección de correo electrónico de la empresa *",
            "requiredError": "Introduzca una dirección de email válida",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Sector *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Accounting",
                 "text": "Contabilidad"
                },
                {
                 "value": "Airlines/Aviation",
                 "text": "Aerolíneas y aviación"
                },
                {
                 "value": "Alternative Dispute Resolution",
                 "text": "Método alternativo de resolución de conflictos"
                },
                {
                 "value": "Alternative Medicine",
                 "text": "Medicina alternativa"
                },
                {
                 "value": "Animation",
                 "text": "Animación"
                },
                {
                 "value": "Apparel & Fashion",
                 "text": "Ropa y moda"
                },
                {
                 "value": "Architecture & Planning",
                 "text": "Arquitectura y planificación"
                },
                {
                 "value": "Arts and Crafts",
                 "text": "Artes y manualidades"
                },
                {
                 "value": "Automotive",
                 "text": "Automoción"
                },
                {
                 "value": "Aviation & Aerospace",
                 "text": "Aviación y aeroespacial"
                },
                {
                 "value": "Banking",
                 "text": "Banca"
                },
                {
                 "value": "Biotechnology",
                 "text": "Biotecnología"
                },
                {
                 "value": "Broadcast Media",
                 "text": "Medios de difusión"
                },
                {
                 "value": "Building Materials",
                 "text": "Materiales de construcción"
                },
                {
                 "value": "Business Supplies and Equipment",
                 "text": "Artículos y equipamientos para oficina"
                },
                {
                 "value": "Capital Markets",
                 "text": "Mercados de capitales"
                },
                {
                 "value": "Chemicals",
                 "text": "Productos químicos"
                },
                {
                 "value": "Civic & Social Organisation",
                 "text": "Organización cívica y social"
                },
                {
                 "value": "Civil Engineering",
                 "text": "Ingeniería civil"
                },
                {
                 "value": "Commercial Real Estate",
                 "text": "Inmuebles comerciales"
                },
                {
                 "value": "Computer & Network Security",
                 "text": "Seguridad informática y de redes"
                },
                {
                 "value": "Computer Games",
                 "text": "Videojuegos"
                },
                {
                 "value": "Computer Hardware",
                 "text": "Hardware"
                },
                {
                 "value": "Computer Networking",
                 "text": "Redes informáticas"
                },
                {
                 "value": "Computer Software",
                 "text": "Software"
                },
                {
                 "value": "Construction",
                 "text": "Construcción"
                },
                {
                 "value": "Consumer Electronics",
                 "text": "Electrónica de consumo"
                },
                {
                 "value": "Consumer Goods",
                 "text": "Bienes de consumo"
                },
                {
                 "value": "Consumer Services",
                 "text": "Servicios al consumidor"
                },
                {
                 "value": "Cosmetics",
                 "text": "Cosmética"
                },
                {
                 "value": "Dairy",
                 "text": "Lácteos"
                },
                {
                 "value": "Defence & Space",
                 "text": "Defensa y espacio"
                },
                {
                 "value": "Design",
                 "text": "Diseño"
                },
                {
                 "value": "Education Management",
                 "text": "Gestión educativa"
                },
                {
                 "value": "E-Learning",
                 "text": "Aprendizaje electrónico"
                },
                {
                 "value": "Electrical/Electronic Manufacturing",
                 "text": "Fabricación eléctrica y electrónica"
                },
                {
                 "value": "Entertainment",
                 "text": "Entretenimiento"
                },
                {
                 "value": "Environmental Services",
                 "text": "Servicios medioambientales"
                },
                {
                 "value": "Events Services",
                 "text": "Servicios de organización de eventos"
                },
                {
                 "value": "Executive Office",
                 "text": "Servicios administrativos"
                },
                {
                 "value": "Facilities Services",
                 "text": "Servicios de instalaciones"
                },
                {
                 "value": "Farming",
                 "text": "Agricultura"
                },
                {
                 "value": "Financial Services",
                 "text": "Servicios financieros"
                },
                {
                 "value": "Fine Art",
                 "text": "Bellas artes"
                },
                {
                 "value": "Fishery",
                 "text": "Pesca"
                },
                {
                 "value": "Food & Beverages",
                 "text": "Alimentación y bebidas"
                },
                {
                 "value": "Food Production",
                 "text": "Producción de alimentos"
                },
                {
                 "value": "Fund-Raising",
                 "text": "Recaudación de fondos"
                },
                {
                 "value": "Furniture",
                 "text": "Mobiliario"
                },
                {
                 "value": "Gambling & Casinos",
                 "text": "Apuestas y casinos"
                },
                {
                 "value": "Glass, Ceramics & Concrete",
                 "text": "Vidrio, cerámica y hormigón"
                },
                {
                 "value": "Government Administration",
                 "text": "Administración pública"
                },
                {
                 "value": "Government Relations",
                 "text": "Relaciones institucionales"
                },
                {
                 "value": "Graphic Design",
                 "text": "Diseño gráfico"
                },
                {
                 "value": "Health, Wellness and Fitness",
                 "text": "Salud, bienestar y ejercicio físico"
                },
                {
                 "value": "Higher Education",
                 "text": "Educación superior"
                },
                {
                 "value": "Hospital & Health Care",
                 "text": "Atención sanitaria y hospitalaria"
                },
                {
                 "value": "Hospitality",
                 "text": "Hostelería"
                },
                {
                 "value": "Human Resources",
                 "text": "Recursos humanos"
                },
                {
                 "value": "Import and Export",
                 "text": "Importación y exportación"
                },
                {
                 "value": "Individual & Family Services",
                 "text": "Servicios de atención a personas y familias"
                },
                {
                 "value": "Industrial Automation",
                 "text": "Automatización industrial"
                },
                {
                 "value": "Information Services",
                 "text": "Servicios de información"
                },
                {
                 "value": "Information Technology and Services",
                 "text": "Servicios y tecnología de la información"
                },
                {
                 "value": "Insurance",
                 "text": "Seguros"
                },
                {
                 "value": "International Affairs",
                 "text": "Asuntos internacionales"
                },
                {
                 "value": "International Trade and Development",
                 "text": "Comercio y desarrollo internacional"
                },
                {
                 "value": "Internet",
                 "text": "Internet"
                },
                {
                 "value": "Investment Banking",
                 "text": "Banca de inversión"
                },
                {
                 "value": "Investment Management",
                 "text": "Gestión de inversiones"
                },
                {
                 "value": "Judiciary",
                 "text": "Judicial"
                },
                {
                 "value": "Law Enforcement",
                 "text": "Cumplimiento legislativo"
                },
                {
                 "value": "Law Practice",
                 "text": "Práctica jurídica"
                },
                {
                 "value": "Legal Services",
                 "text": "Servicios jurídicos"
                },
                {
                 "value": "Legislative Office",
                 "text": "Cargos legislativos"
                },
                {
                 "value": "Leisure, Travel & Tourism",
                 "text": "Ocio, viajes y turismo"
                },
                {
                 "value": "Libraries",
                 "text": "Bibliotecas"
                },
                {
                 "value": "Logistics and Supply Chain",
                 "text": "Logística y cadena de suministro"
                },
                {
                 "value": "Luxury Goods & Jewellery",
                 "text": "Artículos de lujo y joyería"
                },
                {
                 "value": "Machinery",
                 "text": "Maquinaria"
                },
                {
                 "value": "Management Consulting",
                 "text": "Consultoría de dirección"
                },
                {
                 "value": "Maritime",
                 "text": "Marítimo"
                },
                {
                 "value": "Market Research",
                 "text": "Investigación de mercado"
                },
                {
                 "value": "Marketing and Advertising",
                 "text": "Marketing y publicidad"
                },
                {
                 "value": "Mechanical or Industrial Engineering",
                 "text": "Ingeniería industrial o mecánica"
                },
                {
                 "value": "Media Production",
                 "text": "Producción de contenidos"
                },
                {
                 "value": "Medical Devices",
                 "text": "Productos sanitarios"
                },
                {
                 "value": "Medical Practice",
                 "text": "Práctica médica"
                },
                {
                 "value": "Mental Health Care",
                 "text": "Cuidado de la salud mental"
                },
                {
                 "value": "Military",
                 "text": "Industria militar"
                },
                {
                 "value": "Mining & Metals",
                 "text": "Minería y metales"
                },
                {
                 "value": "Mobile Games",
                 "text": "Juegos móviles"
                },
                {
                 "value": "Motion Pictures and Film",
                 "text": "Cinematografía y películas"
                },
                {
                 "value": "Museums and Institutions",
                 "text": "Museos e instituciones"
                },
                {
                 "value": "Music",
                 "text": "Música"
                },
                {
                 "value": "Nanotechnology",
                 "text": "Nanotecnología"
                },
                {
                 "value": "Newspapers",
                 "text": "Prensa"
                },
                {
                 "value": "Non-Profit Organisation Management",
                 "text": "Dirección de organizaciones sin ánimo de lucro"
                },
                {
                 "value": "Oil & Energy",
                 "text": "Petróleo y energía"
                },
                {
                 "value": "Online Media",
                 "text": "Medios en línea"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                },
                {
                 "value": "Outsourcing/Offshoring",
                 "text": "Externalización y deslocalización"
                },
                {
                 "value": "Package/Freight Delivery",
                 "text": "Transporte de paquetes y mercancías"
                },
                {
                 "value": "Packaging and Containers",
                 "text": "Embalajes y contenedores"
                },
                {
                 "value": "Paper & Forest Products",
                 "text": "Productos de papel y forestales"
                },
                {
                 "value": "Performing Arts",
                 "text": "Artes escénicas"
                },
                {
                 "value": "Pharmaceuticals",
                 "text": "Sector farmacéutico"
                },
                {
                 "value": "Philanthropy",
                 "text": "Filantropía"
                },
                {
                 "value": "Photography",
                 "text": "Fotografía"
                },
                {
                 "value": "Plastics",
                 "text": "Plásticos"
                },
                {
                 "value": "Political Organisation",
                 "text": "Organización política"
                },
                {
                 "value": "Primary/Secondary Education",
                 "text": "Educación primaria y secundaria"
                },
                {
                 "value": "Printing",
                 "text": "Impresión"
                },
                {
                 "value": "Professional Training & Coaching",
                 "text": "Formación y orientación profesional"
                },
                {
                 "value": "Program Development",
                 "text": "Desarrollo de programas"
                },
                {
                 "value": "Public Policy",
                 "text": "Política pública"
                },
                {
                 "value": "Public Relations and Communications",
                 "text": "Relaciones públicas y comunicaciones"
                },
                {
                 "value": "Public Safety",
                 "text": "Seguridad pública"
                },
                {
                 "value": "Publishing",
                 "text": "Editorial"
                },
                {
                 "value": "Railroad Manufacture",
                 "text": "Fabricación de ferrocarriles"
                },
                {
                 "value": "Ranching",
                 "text": "Ganadería"
                },
                {
                 "value": "Real Estate",
                 "text": "Sector inmobiliario"
                },
                {
                 "value": "Recreational Facilities and Services",
                 "text": "Instalaciones y servicios recreativos"
                },
                {
                 "value": "Religious Institutions",
                 "text": "Instituciones religiosas"
                },
                {
                 "value": "Renewables & Environment",
                 "text": "Energías renovables y medioambiente"
                },
                {
                 "value": "Research",
                 "text": "Investigación"
                },
                {
                 "value": "Restaurants",
                 "text": "Restauración"
                },
                {
                 "value": "Retail",
                 "text": "Comercio minorista"
                },
                {
                 "value": "Security and Investigations",
                 "text": "Seguridad e investigaciones"
                },
                {
                 "value": "Semiconductors",
                 "text": "Semiconductores"
                },
                {
                 "value": "Shipbuilding",
                 "text": "Construcción naval"
                },
                {
                 "value": "Sporting Goods",
                 "text": "Artículos deportivos"
                },
                {
                 "value": "Sports",
                 "text": "Deportes"
                },
                {
                 "value": "Staffing and Recruiting",
                 "text": "Selección y contratación de personal"
                },
                {
                 "value": "Supermarkets",
                 "text": "Supermercados"
                },
                {
                 "value": "Telecommunications",
                 "text": "Telecomunicaciones"
                },
                {
                 "value": "Textiles",
                 "text": "Textil"
                },
                {
                 "value": "Think Tanks",
                 "text": "Think Tanks"
                },
                {
                 "value": "Tobacco",
                 "text": "Tabaco"
                },
                {
                 "value": "Translation and Localisation",
                 "text": "Traducción y localización"
                },
                {
                 "value": "Transportation/Trucking/Railroad",
                 "text": "Transporte por carretera y ferrocarril"
                },
                {
                 "value": "Utilities",
                 "text": "Servicios públicos"
                },
                {
                 "value": "Venture Capital & Private Equity",
                 "text": "Capital de riesgo y capital privado"
                },
                {
                 "value": "Veterinary",
                 "text": "Veterinario"
                },
                {
                 "value": "Warehousing",
                 "text": "Almacenamiento"
                },
                {
                 "value": "Wholesale",
                 "text": "Venta al por mayor"
                },
                {
                 "value": "Wine and Spirits",
                 "text": "Vinos y licores"
                },
                {
                 "value": "Wireless",
                 "text": "Comunicaciones inalámbricas"
                },
                {
                 "value": "Writing and Editing",
                 "text": "Redacción y edición"
                }
               ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Teléfono de empresa *",
            "requiredError": "Introduzca un número de teléfono válido",
        },
        "Company" : {
            "type": "text",
            "label": "Nombre de la empresa u organización *",
            "requiredError": "El campo es obligatorio",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Ingresos de la empresa",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "Menos de 176 millones de EUR"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "De 177 a 440 millones de EUR"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "De 441 a 880 millones de EUR"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "Más de 880 millones de EUR"
                }
               ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Tamaño de la empresa",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "Menos de 3000 empleados"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "De 3001 a 5000 empleados"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "De 5001 a 10 000 empleados"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "Más de 10 001 empleados"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "País *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afganistán"
                },
                {
                 "value": "Aland Islands",
                 "text": "Islas Aland"
                },
                {
                 "value": "Albania",
                 "text": "Albania"
                },
                {
                 "value": "Algeria",
                 "text": "Argelia"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguila"
                },
                {
                 "value": "Antarctica",
                 "text": "Antártida"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua y Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentina"
                },
                {
                 "value": "Armenia",
                 "text": "Armenia"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australia"
                },
                {
                 "value": "Austria",
                 "text": "Austria"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaiyán"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Baréin"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladés"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Bielorrusia"
                },
                {
                 "value": "Belgium",
                 "text": "Bélgica"
                },
                {
                 "value": "Belize",
                 "text": "Belice"
                },
                {
                 "value": "Benin",
                 "text": "Benín"
                },
                {
                 "value": "Bermuda",
                 "text": "Islas Bermudas"
                },
                {
                 "value": "Bhutan",
                 "text": "Bután"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Estado Plurinacional de Bolivia"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, San Eustaquio y Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnia y Herzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botsuana"
                },
                {
                 "value": "Brazil",
                 "text": "Brasil"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Territorio Británico del Océano Índico"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Islas Vírgenes Británicas"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunéi Darusalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgaria"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Camboya"
                },
                {
                 "value": "Cameroon",
                 "text": "Camerún"
                },
                {
                 "value": "Canada",
                 "text": "Canadá"
                },
                {
                 "value": "Cape Verde",
                 "text": "Cabo Verde"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Islas Caimán"
                },
                {
                 "value": "Central African Republic",
                 "text": "República Centroafricana"
                },
                {
                 "value": "Chad",
                 "text": "Chad"
                },
                {
                 "value": "Chile",
                 "text": "Chile"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Christmas Island",
                 "text": "Isla de Navidad"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Islas Cocos o Islas Keeling"
                },
                {
                 "value": "Colombia",
                 "text": "Colombia"
                },
                {
                 "value": "Comoros",
                 "text": "Comoras"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "República Democrática del Congo"
                },
                {
                 "value": "Cook Islands",
                 "text": "Islas Cook"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Costa de Marfil"
                },
                {
                 "value": "Crimea Region",
                 "text": "Región de Crimea"
                },
                {
                 "value": "Croatia",
                 "text": "Croacia"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curazao"
                },
                {
                 "value": "Cyprus",
                 "text": "Chipre"
                },
                {
                 "value": "Czech Republic",
                 "text": "República Checa"
                },
                {
                 "value": "Denmark",
                 "text": "Dinamarca"
                },
                {
                 "value": "Djibouti",
                 "text": "Yibuti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "República Dominicana"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "Egypt",
                 "text": "Egipto"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Guinea Ecuatorial"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estonia"
                },
                {
                 "value": "Ethiopia",
                 "text": "Etiopía"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Islas Malvinas o Islas Falkland"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Islas Feroe"
                },
                {
                 "value": "Fiji",
                 "text": "Fiyi"
                },
                {
                 "value": "Finland",
                 "text": "Finlandia"
                },
                {
                 "value": "France",
                 "text": "Francia"
                },
                {
                 "value": "French Guiana",
                 "text": "Guayana Francesa"
                },
                {
                 "value": "French Polynesia",
                 "text": "Polinesia Francesa"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Territorios Australes Franceses"
                },
                {
                 "value": "Gabon",
                 "text": "Gabón"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgia"
                },
                {
                 "value": "Germany",
                 "text": "Alemania"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Grecia"
                },
                {
                 "value": "Greenland",
                 "text": "Groenlandia"
                },
                {
                 "value": "Grenada",
                 "text": "Granada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadalupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernesey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinea-Bisáu"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haití"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Islas Heard y McDonald"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Santa Sede (Estado de la Ciudad del Vaticano)"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Región Administrativa Especial de Hong Kong, China"
                },
                {
                 "value": "Hungary",
                 "text": "Hungría"
                },
                {
                 "value": "Iceland",
                 "text": "Islandia"
                },
                {
                 "value": "India",
                 "text": "India"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesia"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "República Islámica de Irán"
                },
                {
                 "value": "Iraq",
                 "text": "Irak"
                },
                {
                 "value": "Ireland",
                 "text": "Irlanda"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isla de Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Italia"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaica"
                },
                {
                 "value": "Japan",
                 "text": "Japón"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordania"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazajistán"
                },
                {
                 "value": "Kenya",
                 "text": "Kenia"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "República Popular Democrática de Corea"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "República de Corea"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kirguistán"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "República Democrática Popular de Laos"
                },
                {
                 "value": "Latvia",
                 "text": "Letonia"
                },
                {
                 "value": "Lebanon",
                 "text": "Líbano"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesoto"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Yamahiriya Árabe Libia Popular y Socialista"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lituania"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxemburgo"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Región Administrativa Especial de Macao, China"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Antigua República Yugoslava de Macedonia"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malaui"
                },
                {
                 "value": "Malaysia",
                 "text": "Malasia"
                },
                {
                 "value": "Maldives",
                 "text": "Maldivas"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Islas Marshall"
                },
                {
                 "value": "Martinique",
                 "text": "Martinica"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritania"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauricio"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "México"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Estados Federados de Micronesia"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "República de Moldavia"
                },
                {
                 "value": "Monaco",
                 "text": "Mónaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolia"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Marruecos"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Myanmar/Birmania"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "Islas Marianas del Norte"
                },
                {
                 "value": "Namibia",
                 "text": "Namibia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Países Bajos"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Antillas Neerlandesas"
                },
                {
                 "value": "New Caledonia",
                 "text": "Nueva Caledonia"
                },
                {
                 "value": "New Zealand",
                 "text": "Nueva Zelanda"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Níger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Isla Norfolk"
                },
                {
                 "value": "North Korea",
                 "text": "Corea del Norte"
                },
                {
                 "value": "Norway",
                 "text": "Noruega"
                },
                {
                 "value": "Oman",
                 "text": "Omán"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistán"
                },
                {
                 "value": "Palau",
                 "text": "Palaos"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Territorio Palestino Ocupado"
                },
                {
                 "value": "Panama",
                 "text": "Panamá"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papúa Nueva Guinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Perú"
                },
                {
                 "value": "Philippines",
                 "text": "Filipinas"
                },
                {
                 "value": "Pitcairn",
                 "text": "Islas Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Polonia"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Puerto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Catar"
                },
                {
                 "value": "Reunion",
                 "text": "Reunión"
                },
                {
                 "value": "Romania",
                 "text": "Rumanía"
                },
                {
                 "value": "Russian Federation",
                 "text": "Federación de Rusia"
                },
                {
                 "value": "Rwanda",
                 "text": "Ruanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "San Bartolomé"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Santa Elena, Ascensión y Tristán da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "San Cristóbal y Nieves"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Santa Lucía"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "San Martín (parte francesa)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "San Pedro y Miquelón"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "San Vicente y las Granadinas"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa Americana"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "Santo Tomé y Príncipe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Arabia Saudí"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbia"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leona"
                },
                {
                 "value": "Singapore",
                 "text": "Singapur"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "San Martín (parte neerlandesa)"
                },
                {
                 "value": "Slovakia",
                 "text": "Eslovaquia"
                },
                {
                 "value": "Slovenia",
                 "text": "Eslovenia"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Islas Salomón"
                },
                {
                 "value": "Somalia",
                 "text": "Somalia"
                },
                {
                 "value": "South Africa",
                 "text": "Sudáfrica"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Islas Georgias del Sur y Sandwich del Sur"
                },
                {
                 "value": "South Sudan",
                 "text": "Sudán del Sur"
                },
                {
                 "value": "Spain",
                 "text": "España"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Sudán"
                },
                {
                 "value": "Suriname",
                 "text": "Surinam"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard y Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Suazilandia"
                },
                {
                 "value": "Sweden",
                 "text": "Suecia"
                },
                {
                 "value": "Switzerland",
                 "text": "Suiza"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "República Árabe Siria"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwán"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tayikistán"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "República Unida de Tanzania"
                },
                {
                 "value": "Thailand",
                 "text": "Tailandia"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor Oriental"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad y Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Túnez"
                },
                {
                 "value": "Turkey",
                 "text": "Turquía"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistán"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Islas Turcas y Caicos"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ucrania"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Emiratos Árabes Unidos"
                },
                {
                 "value": "United Kingdom",
                 "text": "Reino Unido"
                },
                {
                 "value": "United States",
                 "text": "Estados Unidos"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "Islas menores alejadas de los Estados Unidos"
                },
                {
                 "value": "Uzbekistan",
                 "text": "Uzbekistán"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "República Bolivariana de Venezuela"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Islas Vírgenes Británicas"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Islas Vírgenes de los Estados Unidos"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis y Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Sáhara Occidental"
                },
                {
                 "value": "Yemen",
                 "text": "Yemen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabue"
                }
               ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "State": {
            "type": "select",
            "label": "Estado *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "California"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawái"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Luisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Misisipi"
                },
                {
                 "value": "MO",
                 "text": "Misuri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "Nuevo Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "Nueva Jersey"
                },
                {
                 "value": "NM",
                 "text": "Nuevo México"
                },
                {
                 "value": "NY",
                 "text": "Nueva York"
                },
                {
                 "value": "NC",
                 "text": "Carolina del Norte"
                },
                {
                 "value": "ND",
                 "text": "Dakota del Norte"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregón"
                },
                {
                 "value": "PA",
                 "text": "Pensilvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "Carolina del Sur"
                },
                {
                 "value": "SD",
                 "text": "Dakota del Sur"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "Virginia Occidental"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "El campo es obligatorio",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Puesto de trabajo",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Contable o interventor"
                },
                {
                 "value": "Account Manager",
                 "text": "Gerente de cuentas"
                },
                {
                 "value": "Assistant",
                 "text": "Asistente"
                },
                {
                 "value": "Branch Manager",
                 "text": "Gerente de sucursal"
                },
                {
                 "value": "Chairman",
                 "text": "Presidente"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Director de cumplimiento normativo"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Director de operaciones digitales"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Director general"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Director financiero"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Director de información"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Director comercial"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Director médico"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Director de operaciones"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Director de compras"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Director de riesgos"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Director de seguridad"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Director técnico"
                },
                {
                 "value": "Commercial Director",
                 "text": "Gerente de ventas"
                },
                {
                 "value": "Consultant",
                 "text": "Consultor"
                },
                {
                 "value": "Customer Experience",
                 "text": "Experiencia del cliente"
                },
                {
                 "value": "Customer Service",
                 "text": "Servicio de atención al cliente"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Transformación digital"
                },
                {
                 "value": "Director- General",
                 "text": "Director: general"
                },
                {
                 "value": "Director - Other",
                 "text": "Director: otro"
                },
                {
                 "value": "Director others",
                 "text": "Otros directores"
                },
                {
                 "value": "Distribution Director",
                 "text": "Director de distribución"
                },
                {
                 "value": "Financial Director",
                 "text": "Responsable financiero"
                },
                {
                 "value": "HR Director",
                 "text": "Director de recursos humanos"
                },
                {
                 "value": "HR Manager",
                 "text": "Gerente de recursos humanos"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "Gestión de aplicaciones de TI"
                },
                {
                 "value": "IT Consulting",
                 "text": "Consultoría de TI"
                },
                {
                 "value": "IT Director",
                 "text": "Director de TI"
                },
                {
                 "value": "IT Manager",
                 "text": "Gerente de TI"
                },
                {
                 "value": "IT Operations",
                 "text": "Operaciones de TI"
                },
                {
                 "value": "IT Strategy",
                 "text": "Estrategia de TI"
                },
                {
                 "value": "IT System Integration",
                 "text": "Integración de sistemas de TI"
                },
                {
                 "value": "Management others",
                 "text": "Otros gerentes"
                },
                {
                 "value": "Managing Director",
                 "text": "Director gerente"
                },
                {
                 "value": "Managing Partner",
                 "text": "Socio gerente"
                },
                {
                 "value": "MarCom Manager",
                 "text": "Responsable de comunicaciones comerciales"
                },
                {
                 "value": "Marketing Director",
                 "text": "Director de marketing"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Miembro de la Junta Directiva"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Miembro del Consejo de Administración"
                },
                {
                 "value": "Minister",
                 "text": "Ministro"
                },
                {
                 "value": "Minister of State",
                 "text": "Delegado regional"
                },
                {
                 "value": "Nursing",
                 "text": "Enfermería"
                },
                {
                 "value": "Operations Director",
                 "text": "Responsable de operaciones"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                },
                {
                 "value": "PA/Assistant",
                 "text": "Auxiliar médico o asistente médico"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Presidente de la Junta Directiva"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Presidente del Consejo de Supervisión"
                },
                {
                 "value": "Press",
                 "text": "Prensa"
                },
                {
                 "value": "Procurement",
                 "text": "Adquisiciones"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Relaciones públicas Gerente"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Responsable de relaciones públicas"
                },
                {
                 "value": "Sales Director",
                 "text": "Director de ventas"
                },
                {
                 "value": "Sales Manager",
                 "text": "Gerente de ventas"
                },
                {
                 "value": "Secretary",
                 "text": "Secretario"
                },
                {
                 "value": "State Secretary",
                 "text": "Secretario de Estado"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisor"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vicepresidente"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vicepresidente de la Junta Directiva"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vicepresidente del Consejo de Administración"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Título del puesto",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Producto *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "IAM solution",
                 "text": "Solución de gestión de identidades y accesos (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Inicio de sesión único (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Gestión de autenticación fuerte"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Gobierno y administración de identidades"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Gestión de acceso web"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (identidad como servicio)"
                },
                {
                 "value": "High Availability",
                 "text": "Alta disponibilidad (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Análisis inteligente de identidades"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                }
               ],
            "requiredError": "El campo es obligatorio",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Tipo de consulta *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Product Information",
                 "text": "Información"
                },
                {
                 "value": "Price Quote",
                 "text": "Precio"
                },
                {
                 "value": "Demo",
                 "text": "Demostración"
                },
                {
                 "value": "Free trial package",
                 "text": "Prueba"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Capacitación y certificación"
                },
                {
                 "value": "Training & Certification",
                 "text": "Capacitación y certificación"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Nueva solución o nuevos servicios para su negocio"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Asistencia sobre productos y atención al cliente (solo clientes actuales de Eviden)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Contabilidad, facturación o pagos"
                },
                {
                 "value": "Job Information",
                 "text": "Información del trabajo"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Consulta de prensa"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Vender a Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Asuntos de alianzas y colaboraciones"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                }
               ],
            "requiredError": "El campo es obligatorio",
        },
        "enquiry" : {
            "type": "text",
            "label": "Consulta",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Autoridad de compra",
            "options": [
                {
                    "value": "", 
                    "text": "Seleccione"
                },
                {
                    "value": "Yes", 
                    "text": "Sí"
                },
                {
                    "value": "No", 
                    "text": "No"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Plazos de compra",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Menos de 3 meses"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "De 3 a 6 meses"
                },
                {
                 "value": "6 to 12 months",
                 "text": "De 6 a 12 meses"
                },
                {
                 "value": "Over 12 months",
                 "text": "Más de 12 meses"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Consentimiento para recibir comunicaciones *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Sí"
                },
                {
                    "value": "no", 
                    "text": "No"
                }
            ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través del Reglamento general de protección de datos (RGPD). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "DPA",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través de las Autoridades de protección de datos (APD). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "CCPA",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través de la Ley de privacidad del consumidor de California (CCPA) y la Ley de derechos de privacidad de California (CPRA). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "CASL",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través de la Ley canadiense contra el correo basura (CASL). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "LGDP",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través de la Ley general brasileña de protección de datos (LGPD). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "POPIA",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través de la Ley sudafricana de protección de datos personales (POPIA). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "LFPDPPP",
             "text": "Valoramos mucho su privacidad. Su país le proporciona derechos a través de la Ley federal mexicana de protección de datos personales en posesión de particulares (LFPDPPP). Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos y cómo puede eliminar sus datos si así lo desea."
            },
            {
             "value": "none",
             "text": "Valoramos mucho su privacidad. Al enviar este formulario, usted acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos."
            }
           ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Suscríbase para asegurarse de recibir comunicaciones relevantes de Eviden relacionadas con nuestros eventos y ofertas. Puede solicitar la baja de este servicio en cualquier momento."
            },
            {
                "value": "CCPA",
                "text": "Al proporcionar su información en este formulario, acepta recibir comunicaciones de Eviden relacionadas con nuestros eventos y ofertas de acuerdo con nuestra Política de privacidad. Puede darse de baja en cualquier momento."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Enviar"
        },
        "ThankYouEmptyDataContent" : "Gracias por su interés.",
        "ThankYouDataContent" : "Gracias por su interés en",
        "DownloadLinkText" : "Puede descargar el informe aquí.",
        "ContactTYText" : "Un miembro de nuestro equipo se pondrá en contacto con usted en breve"
   },

    "Latin American Spanish": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Idioma preferido",
            "options": [
                {
                    "value": "",
                    "text": "Seleccione"
                   },
                   {
                    "value": "English GB",
                    "text": "Inglés - GB"
                   },
                   {
                    "value": "English US",
                    "text": "Inglés - EE.UU."
                   },
                   {
                    "value": "French",
                    "text": "Francés"
                   },
                   {
                    "value": "Italian",
                    "text": "Italiano"
                   },
                   {
                    "value": "German",
                    "text": "Alemán"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Español latinoamericano"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Español europeo"
                   },
                   {
                    "value": "Dutch",
                    "text": "Holandés"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Portugués brasileño"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japonés"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Saludo",
            "options": [
                {
                    "value": "", 
                    "text": "Seleccione"
                },
                {
                    "value": "Sr.", 
                    "text": "Sr."
                },
                {
                    "value": "Sra.", 
                    "text": "Sra."
                },
                {
                    "value": "Srta.", 
                    "text": "Srta."
                },
                {
                    "value": "Sx.", 
                    "text": "Sx."
                },                               
                {
                    "value": "Maestro/a", 
                    "text": "Maestro/a"
                },                
                {
                    "value": "Señor", 
                    "text": "Señor"
                },               
                {
                    "value": "Dr.", 
                    "text": "Dr."
                },
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "Nombre *",
            "requiredError": "Este campo es obligatorio",
            },
        "LastName": {
            "type": "text",
            "label": "Apellido *",
            "requiredError": "Este campo es obligatorio",
            },        
        "Email" : {
            "type": "email",
            "label": "Dirección de correo electrónico comercial *",
            "requiredError": "Introduzca una dirección de correo electrónico válida",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Industria *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Accounting",
                 "text": "Contabilidad"
                },
                {
                 "value": "Airlines/Aviation",
                 "text": "Aerolíneas/aviación"
                },
                {
                 "value": "Alternative Dispute Resolution",
                 "text": "Resolución de conflicto alternativa"
                },
                {
                 "value": "Alternative Medicine",
                 "text": "Medicina alternativa"
                },
                {
                 "value": "Animation",
                 "text": "Animación"
                },
                {
                 "value": "Apparel & Fashion",
                 "text": "Ropa y moda"
                },
                {
                 "value": "Architecture & Planning",
                 "text": "Arquitectura y planificación"
                },
                {
                 "value": "Arts and Crafts",
                 "text": "Artes y manualidades"
                },
                {
                 "value": "Automotive",
                 "text": "Automotriz"
                },
                {
                 "value": "Aviation & Aerospace",
                 "text": "Aviación y aeroespacial"
                },
                {
                 "value": "Banking",
                 "text": "Banca"
                },
                {
                 "value": "Biotechnology",
                 "text": "Biotecnología"
                },
                {
                 "value": "Broadcast Media",
                 "text": "Medios de difusión"
                },
                {
                 "value": "Building Materials",
                 "text": "Materiales de construcción"
                },
                {
                 "value": "Business Supplies and Equipment",
                 "text": "Artículos de oficina y equipamiento"
                },
                {
                 "value": "Capital Markets",
                 "text": "Mercados de capitales"
                },
                {
                 "value": "Chemicals",
                 "text": "Químicos"
                },
                {
                 "value": "Civic & Social Organisation",
                 "text": "Organización cívica y social"
                },
                {
                 "value": "Civil Engineering",
                 "text": "Ingeniería civil"
                },
                {
                 "value": "Commercial Real Estate",
                 "text": "Bienes raíces comerciales"
                },
                {
                 "value": "Computer & Network Security",
                 "text": "Seguridad informática y de redes"
                },
                {
                 "value": "Computer Games",
                 "text": "Juegos de computadora"
                },
                {
                 "value": "Computer Hardware",
                 "text": "Hardware"
                },
                {
                 "value": "Computer Networking",
                 "text": "Redes de computadoras"
                },
                {
                 "value": "Computer Software",
                 "text": "Software"
                },
                {
                 "value": "Construction",
                 "text": "Construcción"
                },
                {
                 "value": "Consumer Electronics",
                 "text": "Electrónica de consumo"
                },
                {
                 "value": "Consumer Goods",
                 "text": "Bienes de consumo"
                },
                {
                 "value": "Consumer Services",
                 "text": "Servicio al consumidor"
                },
                {
                 "value": "Cosmetics",
                 "text": "Productos cosméticos"
                },
                {
                 "value": "Dairy",
                 "text": "Lácteos"
                },
                {
                 "value": "Defence & Space",
                 "text": "Defensa y espacio"
                },
                {
                 "value": "Design",
                 "text": "Diseño"
                },
                {
                 "value": "Education Management",
                 "text": "Administración de educación"
                },
                {
                 "value": "E-Learning",
                 "text": "Aprendizaje en línea"
                },
                {
                 "value": "Electrical/Electronic Manufacturing",
                 "text": "Fabricación eléctrica/electrónica"
                },
                {
                 "value": "Entertainment",
                 "text": "Entretenimiento"
                },
                {
                 "value": "Environmental Services",
                 "text": "Servicios ambientales"
                },
                {
                 "value": "Events Services",
                 "text": "Servicios de eventos"
                },
                {
                 "value": "Executive Office",
                 "text": "Oficina ejecutiva"
                },
                {
                 "value": "Facilities Services",
                 "text": "Servicios de instalaciones"
                },
                {
                 "value": "Farming",
                 "text": "Agricultura"
                },
                {
                 "value": "Financial Services",
                 "text": "Servicios financieros"
                },
                {
                 "value": "Fine Art",
                 "text": "Bellas artes"
                },
                {
                 "value": "Fishery",
                 "text": "Pesquería"
                },
                {
                 "value": "Food & Beverages",
                 "text": "Alimentos y bebidas"
                },
                {
                 "value": "Food Production",
                 "text": "Producción de alimentos"
                },
                {
                 "value": "Fund-Raising",
                 "text": "Recaudación de fondos"
                },
                {
                 "value": "Furniture",
                 "text": "Muebles"
                },
                {
                 "value": "Gambling & Casinos",
                 "text": "Apuestas y casinos"
                },
                {
                 "value": "Glass, Ceramics & Concrete",
                 "text": "Vidrio, cerámica y concreto"
                },
                {
                 "value": "Government Administration",
                 "text": "Administración gubernamental"
                },
                {
                 "value": "Government Relations",
                 "text": "Relaciones gubernamentales"
                },
                {
                 "value": "Graphic Design",
                 "text": "Diseño gráfico"
                },
                {
                 "value": "Health, Wellness and Fitness",
                 "text": "Salud, bienestar y entrenamiento físico"
                },
                {
                 "value": "Higher Education",
                 "text": "Educación superior"
                },
                {
                 "value": "Hospital & Health Care",
                 "text": "Atención sanitaria y hospitalaria"
                },
                {
                 "value": "Hospitality",
                 "text": "Hospitalidad"
                },
                {
                 "value": "Human Resources",
                 "text": "Recursos humanos"
                },
                {
                 "value": "Import and Export",
                 "text": "Importación y exportación"
                },
                {
                 "value": "Individual & Family Services",
                 "text": "Servicios individuales y familiares"
                },
                {
                 "value": "Industrial Automation",
                 "text": "Automatización industrial"
                },
                {
                 "value": "Information Services",
                 "text": "Servicios de información"
                },
                {
                 "value": "Information Technology and Services",
                 "text": "Servicios y tecnologías de la información"
                },
                {
                 "value": "Insurance",
                 "text": "Seguros"
                },
                {
                 "value": "International Affairs",
                 "text": "Asuntos internacionales"
                },
                {
                 "value": "International Trade and Development",
                 "text": "Comercio internacional y desarrollo"
                },
                {
                 "value": "Internet",
                 "text": "Internet"
                },
                {
                 "value": "Investment Banking",
                 "text": "Banca de inversión"
                },
                {
                 "value": "Investment Management",
                 "text": "Gestión de inversiones"
                },
                {
                 "value": "Judiciary",
                 "text": "Judicial"
                },
                {
                 "value": "Law Enforcement",
                 "text": "Cumplimiento de la ley"
                },
                {
                 "value": "Law Practice",
                 "text": "Práctica jurídica"
                },
                {
                 "value": "Legal Services",
                 "text": "Servicios legales"
                },
                {
                 "value": "Legislative Office",
                 "text": "Oficina legislativa"
                },
                {
                 "value": "Leisure, Travel & Tourism",
                 "text": "Ocio, viajes y turismo"
                },
                {
                 "value": "Libraries",
                 "text": "Bibliotecas"
                },
                {
                 "value": "Logistics and Supply Chain",
                 "text": "Logística y cadena de suministro"
                },
                {
                 "value": "Luxury Goods & Jewellery",
                 "text": "Artículos de lujo y joyería"
                },
                {
                 "value": "Machinery",
                 "text": "Maquinaria"
                },
                {
                 "value": "Management Consulting",
                 "text": "Consultoría de gestión"
                },
                {
                 "value": "Maritime",
                 "text": "Marítimo"
                },
                {
                 "value": "Market Research",
                 "text": "Investigación de mercado"
                },
                {
                 "value": "Marketing and Advertising",
                 "text": "Marketing y publicidad"
                },
                {
                 "value": "Mechanical or Industrial Engineering",
                 "text": "Ingeniería industrial o mecánica"
                },
                {
                 "value": "Media Production",
                 "text": "Producción de medios"
                },
                {
                 "value": "Medical Devices",
                 "text": "Dispositivos médicos"
                },
                {
                 "value": "Medical Practice",
                 "text": "Ejercicio de la medicina"
                },
                {
                 "value": "Mental Health Care",
                 "text": "Atención a la salud mental"
                },
                {
                 "value": "Military",
                 "text": "Militar"
                },
                {
                 "value": "Mining & Metals",
                 "text": "Minería y metales"
                },
                {
                 "value": "Mobile Games",
                 "text": "Juegos móviles"
                },
                {
                 "value": "Motion Pictures and Film",
                 "text": "Películas y cine"
                },
                {
                 "value": "Museums and Institutions",
                 "text": "Museos e instituciones"
                },
                {
                 "value": "Music",
                 "text": "Música"
                },
                {
                 "value": "Nanotechnology",
                 "text": "Nanotecnología"
                },
                {
                 "value": "Newspapers",
                 "text": "Periódicos"
                },
                {
                 "value": "Non-Profit Organisation Management",
                 "text": "Gestión de organizaciones sin fines de lucro"
                },
                {
                 "value": "Oil & Energy",
                 "text": "Petróleo y energía"
                },
                {
                 "value": "Online Media",
                 "text": "Medios en línea"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                },
                {
                 "value": "Outsourcing/Offshoring",
                 "text": "Subcontratación/offshoring"
                },
                {
                 "value": "Package/Freight Delivery",
                 "text": "Entrega de paquetes/carga"
                },
                {
                 "value": "Packaging and Containers",
                 "text": "Empaques y envases"
                },
                {
                 "value": "Paper & Forest Products",
                 "text": "Productos de papel y forestales"
                },
                {
                 "value": "Performing Arts",
                 "text": "Artes escénicas"
                },
                {
                 "value": "Pharmaceuticals",
                 "text": "Productos farmacéuticos"
                },
                {
                 "value": "Philanthropy",
                 "text": "Filantropía"
                },
                {
                 "value": "Photography",
                 "text": "Fotografía"
                },
                {
                 "value": "Plastics",
                 "text": "Plásticos"
                },
                {
                 "value": "Political Organisation",
                 "text": "Organización política"
                },
                {
                 "value": "Primary/Secondary Education",
                 "text": "Educación primaria/secundaria"
                },
                {
                 "value": "Printing",
                 "text": "Impresión"
                },
                {
                 "value": "Professional Training & Coaching",
                 "text": "Formación profesional y capacitación"
                },
                {
                 "value": "Program Development",
                 "text": "Desarrollo de programas"
                },
                {
                 "value": "Public Policy",
                 "text": "Política pública"
                },
                {
                 "value": "Public Relations and Communications",
                 "text": "Relaciones públicas y comunicaciones"
                },
                {
                 "value": "Public Safety",
                 "text": "Seguridad pública"
                },
                {
                 "value": "Publishing",
                 "text": "Publicación"
                },
                {
                 "value": "Railroad Manufacture",
                 "text": "Fabricación de ferrocarriles"
                },
                {
                 "value": "Ranching",
                 "text": "Ganadería"
                },
                {
                 "value": "Real Estate",
                 "text": "Bienes raíces"
                },
                {
                 "value": "Recreational Facilities and Services",
                 "text": "Instalaciones y servicios recreativos"
                },
                {
                 "value": "Religious Institutions",
                 "text": "Instituciones religiosas"
                },
                {
                 "value": "Renewables & Environment",
                 "text": "Energía renovable y medio ambiente"
                },
                {
                 "value": "Research",
                 "text": "Investigación"
                },
                {
                 "value": "Restaurants",
                 "text": "Restaurantes"
                },
                {
                 "value": "Retail",
                 "text": "Venta minorista"
                },
                {
                 "value": "Security and Investigations",
                 "text": "Seguridad e investigaciones"
                },
                {
                 "value": "Semiconductors",
                 "text": "Semiconductores"
                },
                {
                 "value": "Shipbuilding",
                 "text": "Construcción naval"
                },
                {
                 "value": "Sporting Goods",
                 "text": "Artículos deportivos"
                },
                {
                 "value": "Sports",
                 "text": "Deportes"
                },
                {
                 "value": "Staffing and Recruiting",
                 "text": "Dotación y selección de personal"
                },
                {
                 "value": "Supermarkets",
                 "text": "Supermercados"
                },
                {
                 "value": "Telecommunications",
                 "text": "Telecomunicaciones"
                },
                {
                 "value": "Textiles",
                 "text": "Textiles"
                },
                {
                 "value": "Think Tanks",
                 "text": "Gabinete de asesoría"
                },
                {
                 "value": "Tobacco",
                 "text": "Tabaco"
                },
                {
                 "value": "Translation and Localisation",
                 "text": "Traducción y localización"
                },
                {
                 "value": "Transportation/Trucking/Railroad",
                 "text": "Transporte/camiones/ferrocarriles"
                },
                {
                 "value": "Utilities",
                 "text": "Servicios públicos"
                },
                {
                 "value": "Venture Capital & Private Equity",
                 "text": "Capital de riesgo y capital privado"
                },
                {
                 "value": "Veterinary",
                 "text": "Veterinaria"
                },
                {
                 "value": "Warehousing",
                 "text": "Almacenamiento"
                },
                {
                 "value": "Wholesale",
                 "text": "Venta al por mayor"
                },
                {
                 "value": "Wine and Spirits",
                 "text": "Vinos y licores"
                },
                {
                 "value": "Wireless",
                 "text": "Inalámbrico"
                },
                {
                 "value": "Writing and Editing",
                 "text": "Redacción y edición"
                }
               ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Teléfono de empresa *",
            "requiredError": "Introduzca un número de teléfono válido",
        },
        "Company" : {
            "type": "text",
            "label": "Nombre de la empresa/organización *",
            "requiredError": "Este campo es obligatorio",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Ingresos de la empresa",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "Menos de $ 200 millones"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "$ 201 millones a $ 500 millones"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "$ 501 mil a $ 1000 millones"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "Más de $ 1000 millones"
                }
               ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Tamaño de la empresa",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "Menos de 3000 empleados"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "3001 a 5000 empleados"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "5001 a 10 000 empleados"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "Más de 10 001 empleados"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "País *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afganistán"
                },
                {
                 "value": "Aland Islands",
                 "text": "Islas Åland"
                },
                {
                 "value": "Albania",
                 "text": "Albania"
                },
                {
                 "value": "Algeria",
                 "text": "Argelia"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguila"
                },
                {
                 "value": "Antarctica",
                 "text": "Antártida"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua y Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentina"
                },
                {
                 "value": "Armenia",
                 "text": "Armenia"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australia"
                },
                {
                 "value": "Austria",
                 "text": "Austria"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaiyán"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Baréin"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladés"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Bielorrusia"
                },
                {
                 "value": "Belgium",
                 "text": "Bélgica"
                },
                {
                 "value": "Belize",
                 "text": "Belice"
                },
                {
                 "value": "Benin",
                 "text": "Benín"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermudas"
                },
                {
                 "value": "Bhutan",
                 "text": "Bután"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivia, Estado Plurinacional de"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, San Eustaquio y Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnia y Herzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botsuana"
                },
                {
                 "value": "Brazil",
                 "text": "Brasil"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Territorio Británico del Océano Índico"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Islas Vírgenes Británicas"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunéi Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgaria"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Camboya"
                },
                {
                 "value": "Cameroon",
                 "text": "Camerún"
                },
                {
                 "value": "Canada",
                 "text": "Canadá"
                },
                {
                 "value": "Cape Verde",
                 "text": "Cabo Verde"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Islas Caimán"
                },
                {
                 "value": "Central African Republic",
                 "text": "República Centroafricana"
                },
                {
                 "value": "Chad",
                 "text": "Chad"
                },
                {
                 "value": "Chile",
                 "text": "Chile"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Christmas Island",
                 "text": "Isla de Navidad"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Islas Cocos (Keeling)"
                },
                {
                 "value": "Colombia",
                 "text": "Colombia"
                },
                {
                 "value": "Comoros",
                 "text": "Comoras"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, República Democrática del"
                },
                {
                 "value": "Cook Islands",
                 "text": "Islas Cook"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Costa de Marfil"
                },
                {
                 "value": "Crimea Region",
                 "text": "Crimea"
                },
                {
                 "value": "Croatia",
                 "text": "Croacia"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curazao"
                },
                {
                 "value": "Cyprus",
                 "text": "Chipre"
                },
                {
                 "value": "Czech Republic",
                 "text": "Republica Checa"
                },
                {
                 "value": "Denmark",
                 "text": "Dinamarca"
                },
                {
                 "value": "Djibouti",
                 "text": "Yibuti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "República Dominicana"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "Egypt",
                 "text": "Egipto"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Guinea Ecuatorial"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estonia"
                },
                {
                 "value": "Ethiopia",
                 "text": "Etiopía"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Islas Malvinas"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Islas Feroe"
                },
                {
                 "value": "Fiji",
                 "text": "Fiyi"
                },
                {
                 "value": "Finland",
                 "text": "Finlandia"
                },
                {
                 "value": "France",
                 "text": "Francia"
                },
                {
                 "value": "French Guiana",
                 "text": "Guayana Francesa"
                },
                {
                 "value": "French Polynesia",
                 "text": "Polinesia Francesa"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Territorios Australes Franceses"
                },
                {
                 "value": "Gabon",
                 "text": "Gabón"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgia"
                },
                {
                 "value": "Germany",
                 "text": "Alemania"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Grecia"
                },
                {
                 "value": "Greenland",
                 "text": "Groenlandia"
                },
                {
                 "value": "Grenada",
                 "text": "Granada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadalupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinea-Bisáu"
                },
                {
                 "value": "Guyana",
                 "text": "Guayana"
                },
                {
                 "value": "Haiti",
                 "text": "Haití"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Islas Heard y McDonald"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Santa Sede (Estado de la Ciudad del Vaticano)"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "RAE de Hong Kong, China"
                },
                {
                 "value": "Hungary",
                 "text": "Hungría"
                },
                {
                 "value": "Iceland",
                 "text": "Islandia"
                },
                {
                 "value": "India",
                 "text": "India"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesia"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Irán, República Islámica de"
                },
                {
                 "value": "Iraq",
                 "text": "Irak"
                },
                {
                 "value": "Ireland",
                 "text": "Irlanda"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isla de Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Italia"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaica"
                },
                {
                 "value": "Japan",
                 "text": "Japón"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordán"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazajistán"
                },
                {
                 "value": "Kenya",
                 "text": "Kenia"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Corea, República Popular Democrática de"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Corea, República de"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kirguistán"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "República Democrática Popular Lao"
                },
                {
                 "value": "Latvia",
                 "text": "Letonia"
                },
                {
                 "value": "Lebanon",
                 "text": "Líbano"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesoto"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Jamahiriya Árabe Libia"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lituania"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxemburgo"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "RAE de Macao, China"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macedonia, la ex República Yugoslava de"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malaui"
                },
                {
                 "value": "Malaysia",
                 "text": "Malasia"
                },
                {
                 "value": "Maldives",
                 "text": "Maldivas"
                },
                {
                 "value": "Mali",
                 "text": "Malí"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Islas Marshall"
                },
                {
                 "value": "Martinique",
                 "text": "Martinica"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritania"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauricio"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "México"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronesia, Estados Federados de"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldavia, República de"
                },
                {
                 "value": "Monaco",
                 "text": "Mónaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolia"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Marruecos"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Birmania"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "Islas Marianas del Norte"
                },
                {
                 "value": "Namibia",
                 "text": "Namibia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Países Bajos"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Antillas Holandesas"
                },
                {
                 "value": "New Caledonia",
                 "text": "Nueva Caledonia"
                },
                {
                 "value": "New Zealand",
                 "text": "Nueva Zelanda"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Níger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Isla Norfolk"
                },
                {
                 "value": "North Korea",
                 "text": "Corea del Norte"
                },
                {
                 "value": "Norway",
                 "text": "Noruega"
                },
                {
                 "value": "Oman",
                 "text": "Omán"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistán"
                },
                {
                 "value": "Palau",
                 "text": "Palaos"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Territorio Palestino, Ocupado"
                },
                {
                 "value": "Panama",
                 "text": "Panamá"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papúa Nueva Guinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Perú"
                },
                {
                 "value": "Philippines",
                 "text": "Filipinas"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Polonia"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Puerto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Catar"
                },
                {
                 "value": "Reunion",
                 "text": "Reunión"
                },
                {
                 "value": "Romania",
                 "text": "Rumania"
                },
                {
                 "value": "Russian Federation",
                 "text": "Federación Rusa"
                },
                {
                 "value": "Rwanda",
                 "text": "Ruanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "San Bartolomé"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Santa Elena, Ascensión y Tristán de Acuña"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "San Cristóbal y Nieves"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Santa Lucía"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "San Martín (parte francesa)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "San Pedro y Miquelón"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "San Vicente y las Granadinas"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa Americana"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "Santo Tomé y Príncipe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Arabia Saudita"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Serbia"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leona"
                },
                {
                 "value": "Singapore",
                 "text": "Singapur"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "San Martín (parte holandesa)"
                },
                {
                 "value": "Slovakia",
                 "text": "Eslovaquia"
                },
                {
                 "value": "Slovenia",
                 "text": "Eslovenia"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Islas Salomón"
                },
                {
                 "value": "Somalia",
                 "text": "Somalia"
                },
                {
                 "value": "South Africa",
                 "text": "Sudáfrica"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Islas Georgias del Sur y Sandwich del Sur"
                },
                {
                 "value": "South Sudan",
                 "text": "Sudán del Sur"
                },
                {
                 "value": "Spain",
                 "text": "España"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Sudán"
                },
                {
                 "value": "Suriname",
                 "text": "Surinam"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard y Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Suazilandia"
                },
                {
                 "value": "Sweden",
                 "text": "Suecia"
                },
                {
                 "value": "Switzerland",
                 "text": "Suiza"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "República Árabe Siria"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwán"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tayikistán"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzania, República Unida de"
                },
                {
                 "value": "Thailand",
                 "text": "Tailandia"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor Oriental"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad y Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Túnez"
                },
                {
                 "value": "Turkey",
                 "text": "Turquía"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistán"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Islas Turcas y Caicos"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ucrania"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Emiratos Árabes Unidos"
                },
                {
                 "value": "United Kingdom",
                 "text": "Reino Unido"
                },
                {
                 "value": "United States",
                 "text": "Estados Unidos"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "Islas Ultramarinas Menores de los Estados Unidos"
                },
                {
                 "value": "Uzbekistan",
                 "text": "Uzbekistán"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, República Bolivariana de"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Islas Vírgenes, británicas"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Islas Vírgenes, EE. UU."
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis y Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Sahara Occidental"
                },
                {
                 "value": "Yemen",
                 "text": "Yemen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabue"
                }
               ]
            ,
            "requiredError": "Seleccione un valor para este campo",
        },
        "State": {
            "type": "select",
            "label": "Estado *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "California"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawái"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Luisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Misisipi"
                },
                {
                 "value": "MO",
                 "text": "Misuri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "Nuevo Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "Nueva Jersey"
                },
                {
                 "value": "NM",
                 "text": "Nuevo México"
                },
                {
                 "value": "NY",
                 "text": "Nueva York"
                },
                {
                 "value": "NC",
                 "text": "Carolina del Norte"
                },
                {
                 "value": "ND",
                 "text": "Dakota del Norte"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregón"
                },
                {
                 "value": "PA",
                 "text": "Pensilvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "Carolina del Sur"
                },
                {
                 "value": "SD",
                 "text": "Dakota del Sur"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "Virginia del Oeste"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Puesto",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Contador/controlador"
                },
                {
                 "value": "Account Manager",
                 "text": "Gerente de cuentas"
                },
                {
                 "value": "Assistant",
                 "text": "Asistente"
                },
                {
                 "value": "Branch Manager",
                 "text": "Gerente de sucursal"
                },
                {
                 "value": "Chairman",
                 "text": "Presidente"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Director de cumplimiento"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Director de operaciones digitales"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Director ejecutivo"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Director financiero"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Director de información"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Director de marketing"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Director médico"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Director de operaciones"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Director de adquisiciones"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Director de riesgos"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Jefe de seguridad"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Jefe de tecnología"
                },
                {
                 "value": "Commercial Director",
                 "text": "Director comercial"
                },
                {
                 "value": "Consultant",
                 "text": "Consultor"
                },
                {
                 "value": "Customer Experience",
                 "text": "Experiencia del cliente"
                },
                {
                 "value": "Customer Service",
                 "text": "Servicio al cliente"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Transformación digital"
                },
                {
                 "value": "Director- General",
                 "text": "Director — general"
                },
                {
                 "value": "Director - Other",
                 "text": "Director — otro"
                },
                {
                 "value": "Director others",
                 "text": "Director — otros"
                },
                {
                 "value": "Distribution Director",
                 "text": "Director de distribución"
                },
                {
                 "value": "Financial Director",
                 "text": "Director financiero"
                },
                {
                 "value": "HR Director",
                 "text": "Director de recursos humanos"
                },
                {
                 "value": "HR Manager",
                 "text": "Gerente de recursos humanos"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "Gestión de aplicaciones de TI"
                },
                {
                 "value": "IT Consulting",
                 "text": "Consultoría de TI"
                },
                {
                 "value": "IT Director",
                 "text": "Director de TI"
                },
                {
                 "value": "IT Manager",
                 "text": "Gerente de TI"
                },
                {
                 "value": "IT Operations",
                 "text": "Operaciones de TI"
                },
                {
                 "value": "IT Strategy",
                 "text": "Estrategia de TI"
                },
                {
                 "value": "IT System Integration",
                 "text": "Integración de sistemas de TI"
                },
                {
                 "value": "Management others",
                 "text": "Gestión — otros"
                },
                {
                 "value": "Managing Director",
                 "text": "Director general"
                },
                {
                 "value": "Managing Partner",
                 "text": "Socio director"
                },
                {
                 "value": "MarCom Manager",
                 "text": "Gerente de marketing y comunicación"
                },
                {
                 "value": "Marketing Director",
                 "text": "Director de marketing"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Miembro de la junta directiva"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Miembro del consejo de vigilancia"
                },
                {
                 "value": "Minister",
                 "text": "Ministro"
                },
                {
                 "value": "Minister of State",
                 "text": "Ministro de estado"
                },
                {
                 "value": "Nursing",
                 "text": "Enfermería"
                },
                {
                 "value": "Operations Director",
                 "text": "Director de operaciones"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Asistente"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Presidente de junta directiva"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Presidente del consejo de vigilancia"
                },
                {
                 "value": "Press",
                 "text": "Prensa"
                },
                {
                 "value": "Procurement",
                 "text": "Adquisición"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Relaciones públicas Gerente"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Director de relaciones públicas"
                },
                {
                 "value": "Sales Director",
                 "text": "Director de ventas"
                },
                {
                 "value": "Sales Manager",
                 "text": "Gerente de ventas"
                },
                {
                 "value": "Secretary",
                 "text": "Secretario"
                },
                {
                 "value": "State Secretary",
                 "text": "Secretaria de estado"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisor"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vicepresidente"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vicepresidente junta directiva"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vicepresidente junta directiva del consejo de vigilancia"
                }
               
            ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Título del puesto",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Producto *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "IAM solution",
                 "text": "Solución de gestión de identidades y accesos (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Inicio de sesión único (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Gestión de autenticación fuerte"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Gobierno y administración de identidades"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Gestión de acceso web"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (identidad como servicio)"
                },
                {
                 "value": "High Availability",
                 "text": "Alta disponibilidad (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Análisis inteligente de identidades"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                }
               ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Tipo de consulta *",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Product Information",
                 "text": "Información"
                },
                {
                 "value": "Price Quote",
                 "text": "Precio"
                },
                {
                 "value": "Demo",
                 "text": "Demostración"
                },
                {
                 "value": "Free trial package",
                 "text": "Prueba"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Nueva solución o servicios para su negocio"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Atención al cliente/producto (solo clientes actuales de Eviden)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Contabilidad, facturación o pagos"
                },
                {
                 "value": "Job Information",
                 "text": "Información del trabajo"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Consulta de prensa"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Vender a Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Asuntos de alianza/asociación"
                },
                {
                 "value": "Other",
                 "text": "Otro"
                }
               ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "enquiry" : {
            "type": "text",
            "label": "Consulta",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Autoridad de compra",
            "options": [
                {
                    "value": "", 
                    "text": "Seleccione"
                },
                {
                    "value": "Yes", 
                    "text": "Sí"
                },
                {
                    "value": "No", 
                    "text": "No"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Línea de tiempo de compra",
            "options": [
                {
                 "value": "",
                 "text": "Seleccione"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Menos de 3 meses"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "3 a 6 meses"
                },
                {
                 "value": "6 to 12 months",
                 "text": "6 a 12 meses"
                },
                {
                 "value": "Over 12 months",
                 "text": "Más de 12 meses"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Consentimiento para recibir comunicaciones *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Sí"
                },
                {
                    "value": "no", 
                    "text": "No"
                }
            ],
            "requiredError": "Seleccione un valor para este campo",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través de la RGPD. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "DPA",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través del APD. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "CCPA",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través del CCPA/CPRA. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "CASL",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través de la CASL. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "LGDP",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través de la LGPD. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "POPIA",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través de la POPIA. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "LFPDPPP",
             "text": "Su privacidad es importante para nosotros. Su país le proporciona derechos a través de la LFPDPPP. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léalo para comprender cómo nos aseguramos de que se respeten sus derechos y cómo eliminar sus datos si así lo desea."
            },
            {
             "value": "none",
             "text": "Su privacidad es importante para nosotros. Al enviar este formulario, acepta los términos de nuestra Política de privacidad. Léala para comprender cómo nos aseguramos de que se respeten sus derechos."
            }
           ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Para asegurarse de recibir comunicaciones relevantes de Eviden relacionadas con nuestros eventos y ofertas, suscríbase. Puede cancelar su suscripción en cualquier momento."
            },
            {
                "value": "CCPA",
                "text": "Al proporcionar su información en este formulario, acepta recibir comunicaciones de Eviden relacionadas con nuestros eventos y ofertas de acuerdo con nuestra Política de privacidad. Usted puede cancelar su suscripción en cualquier momento."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Enviar"
        },
        "ThankYouEmptyDataContent" : "Gracias por su interés.",
        "ThankYouDataContent" : "Gracias por su interés en",
        "DownloadLinkText" : "Puede descargar el informe aquí.",
        "ContactTYText" : "Un miembro de nuestro equipo se pondrá en contacto con usted en breve"
    },

    "Dutch": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Voorkeurstaal",
            "options": [
                {
                    "value": "",
                    "text": "Selecteer"
                   },
                   {
                    "value": "English GB",
                    "text": "Engels-VK"
                   },
                   {
                    "value": "English US",
                    "text": "Engels-VS"
                   },
                   {
                    "value": "French",
                    "text": "Frans"
                   },
                   {
                    "value": "Italian",
                    "text": "Italiaans"
                   },
                   {
                    "value": "German",
                    "text": "Duitsland"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Latijns-Amerikaans Spaans"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Europees Spaans"
                   },
                   {
                    "value": "Dutch",
                    "text": "Duits"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Braziliaans Portugees"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japans"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Aanhef",
            "options": [
                {
                    "value": "",
                    "text": "Selecteer"
                   },
                   {
                    "value": "Dhr.",
                    "text": "Dhr."
                   },
                   {
                    "value": "Mevr.",
                    "text": "Mevr."
                   },
                   {
                    "value": "Mej.",
                    "text": "Mej."
                   },
                   {
                    "value": "Overig",
                    "text": "Overig"
                   },
                   {
                    "value": "mr.",
                    "text": "mr."
                   },
                   {
                    "value": "dr.",
                    "text": "dr."
                   }
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "Voornaam *",
            "requiredError": "Dit veld is verplicht",
            },
        "LastName": {
            "type": "text",
            "label": "Achternaam *",
            "requiredError": "Dit veld is verplicht",
            },        
        "Email" : {
            "type": "email",
            "label": "Zakelijk e-mailadres *",
            "requiredError": "Voer een geldig e-mailadres in",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Industrie *",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Accounting",
                 "text": "Boekhouding"
                },
                {
                 "value": "Airlines/Aviation",
                 "text": "Luchtvaartmaatschappijen/Luchtvaart"
                },
                {
                 "value": "Alternative Dispute Resolution",
                 "text": "Alternatieve geschillenbeslechting"
                },
                {
                 "value": "Alternative Medicine",
                 "text": "Alternatieve geneeskunde"
                },
                {
                 "value": "Animation",
                 "text": "Animatie"
                },
                {
                 "value": "Apparel & Fashion",
                 "text": "Kleding & mode"
                },
                {
                 "value": "Architecture & Planning",
                 "text": "Architectuur en planning"
                },
                {
                 "value": "Arts and Crafts",
                 "text": "Kunst en ambacht"
                },
                {
                 "value": "Automotive",
                 "text": "Autosector"
                },
                {
                 "value": "Aviation & Aerospace",
                 "text": "Lucht- en ruimtevaart"
                },
                {
                 "value": "Banking",
                 "text": "Bankensector"
                },
                {
                 "value": "Biotechnology",
                 "text": "Biotechnologie"
                },
                {
                 "value": "Broadcast Media",
                 "text": "Radio en televisie"
                },
                {
                 "value": "Building Materials",
                 "text": "Bouwmaterialen"
                },
                {
                 "value": "Business Supplies and Equipment",
                 "text": "Kantoorbenodigdheden en -apparatuur"
                },
                {
                 "value": "Capital Markets",
                 "text": "Kapitaalmarkten"
                },
                {
                 "value": "Chemicals",
                 "text": "Chemische producten"
                },
                {
                 "value": "Civic & Social Organisation",
                 "text": "Burgerlijke en sociale organisatie"
                },
                {
                 "value": "Civil Engineering",
                 "text": "Civiele techniek"
                },
                {
                 "value": "Commercial Real Estate",
                 "text": "Commercieel vastgoed"
                },
                {
                 "value": "Computer & Network Security",
                 "text": "Computer- en netwerkbeveiliging"
                },
                {
                 "value": "Computer Games",
                 "text": "Computerspellen"
                },
                {
                 "value": "Computer Hardware",
                 "text": "Computerhardware"
                },
                {
                 "value": "Computer Networking",
                 "text": "Computernetwerken"
                },
                {
                 "value": "Computer Software",
                 "text": "Computersoftware"
                },
                {
                 "value": "Construction",
                 "text": "Bouw"
                },
                {
                 "value": "Consumer Electronics",
                 "text": "Consumentenelektronica"
                },
                {
                 "value": "Consumer Goods",
                 "text": "Consumentengoederen"
                },
                {
                 "value": "Consumer Services",
                 "text": "Consumentendiensten"
                },
                {
                 "value": "Cosmetics",
                 "text": "Cosmetica"
                },
                {
                 "value": "Dairy",
                 "text": "Zuivel"
                },
                {
                 "value": "Defence & Space",
                 "text": "Defensie & ruimte"
                },
                {
                 "value": "Design",
                 "text": "Ontwerp"
                },
                {
                 "value": "Education Management",
                 "text": "Onderwijsbeheer"
                },
                {
                 "value": "E-Learning",
                 "text": "E-learning"
                },
                {
                 "value": "Electrical/Electronic Manufacturing",
                 "text": "Elektrische/elektronische productie"
                },
                {
                 "value": "Entertainment",
                 "text": "Entertainment"
                },
                {
                 "value": "Environmental Services",
                 "text": "Milieudiensten"
                },
                {
                 "value": "Events Services",
                 "text": "Evenementendiensten"
                },
                {
                 "value": "Executive Office",
                 "text": "Uitvoerend bureau"
                },
                {
                 "value": "Facilities Services",
                 "text": "Gebouwenbeheer"
                },
                {
                 "value": "Farming",
                 "text": "Landbouw"
                },
                {
                 "value": "Financial Services",
                 "text": "Financiële diensten"
                },
                {
                 "value": "Fine Art",
                 "text": "Kunst"
                },
                {
                 "value": "Fishery",
                 "text": "Visserij"
                },
                {
                 "value": "Food & Beverages",
                 "text": "Voedsel en drank"
                },
                {
                 "value": "Food Production",
                 "text": "Voedselproductie"
                },
                {
                 "value": "Fund-Raising",
                 "text": "Fondsenwerving"
                },
                {
                 "value": "Furniture",
                 "text": "Meubels"
                },
                {
                 "value": "Gambling & Casinos",
                 "text": "Gokken en casino's"
                },
                {
                 "value": "Glass, Ceramics & Concrete",
                 "text": "Glas, keramiek en beton"
                },
                {
                 "value": "Government Administration",
                 "text": "Overheidsdienst"
                },
                {
                 "value": "Government Relations",
                 "text": "Overheidsrelaties"
                },
                {
                 "value": "Graphic Design",
                 "text": "Grafisch ontwerp"
                },
                {
                 "value": "Health, Wellness and Fitness",
                 "text": "Gezondheid, welzijn en fitness"
                },
                {
                 "value": "Higher Education",
                 "text": "Hoger onderwijs"
                },
                {
                 "value": "Hospital & Health Care",
                 "text": "Ziekenhuis & gezondheidszorg"
                },
                {
                 "value": "Hospitality",
                 "text": "Horeca"
                },
                {
                 "value": "Human Resources",
                 "text": "Personeelszaken"
                },
                {
                 "value": "Import and Export",
                 "text": "Invoer en uitvoer"
                },
                {
                 "value": "Individual & Family Services",
                 "text": "Individuele en gezinsdiensten"
                },
                {
                 "value": "Industrial Automation",
                 "text": "Industriële automatisering"
                },
                {
                 "value": "Information Services",
                 "text": "Informatiediensten"
                },
                {
                 "value": "Information Technology and Services",
                 "text": "Informatietechnologie en -diensten"
                },
                {
                 "value": "Insurance",
                 "text": "Verzekeringen"
                },
                {
                 "value": "International Affairs",
                 "text": "Internationale zaken"
                },
                {
                 "value": "International Trade and Development",
                 "text": "Internationale handel en ontwikkeling"
                },
                {
                 "value": "Internet",
                 "text": "Internet"
                },
                {
                 "value": "Investment Banking",
                 "text": "Investeringsbanken"
                },
                {
                 "value": "Investment Management",
                 "text": "Beleggingsbeheer"
                },
                {
                 "value": "Judiciary",
                 "text": "Rechterlijke macht"
                },
                {
                 "value": "Law Enforcement",
                 "text": "Wetshandhaving"
                },
                {
                 "value": "Law Practice",
                 "text": "Rechtspraktijk"
                },
                {
                 "value": "Legal Services",
                 "text": "Juridische diensten"
                },
                {
                 "value": "Legislative Office",
                 "text": "Kantoor van wetgever"
                },
                {
                 "value": "Leisure, Travel & Tourism",
                 "text": "Vrije tijd, reizen & toerisme"
                },
                {
                 "value": "Libraries",
                 "text": "Bibliotheken"
                },
                {
                 "value": "Logistics and Supply Chain",
                 "text": "Logistiek en bevoorradingsketen"
                },
                {
                 "value": "Luxury Goods & Jewellery",
                 "text": "Luxegoederen en juwelen"
                },
                {
                 "value": "Machinery",
                 "text": "Machines"
                },
                {
                 "value": "Management Consulting",
                 "text": "Managementadvies"
                },
                {
                 "value": "Maritime",
                 "text": "Maritiem"
                },
                {
                 "value": "Market Research",
                 "text": "Marktonderzoek"
                },
                {
                 "value": "Marketing and Advertising",
                 "text": "Marketing en reclame"
                },
                {
                 "value": "Mechanical or Industrial Engineering",
                 "text": "Mechanische of industriële engineering"
                },
                {
                 "value": "Media Production",
                 "text": "Mediaproductie"
                },
                {
                 "value": "Medical Devices",
                 "text": "Medische apparatuur"
                },
                {
                 "value": "Medical Practice",
                 "text": "Medische praktijk"
                },
                {
                 "value": "Mental Health Care",
                 "text": "Geestelijke gezondheidszorg"
                },
                {
                 "value": "Military",
                 "text": "Strijdkrachten"
                },
                {
                 "value": "Mining & Metals",
                 "text": "Mijnbouw en metalen"
                },
                {
                 "value": "Mobile Games",
                 "text": "Mobiele spellen"
                },
                {
                 "value": "Motion Pictures and Film",
                 "text": "Speelfilms"
                },
                {
                 "value": "Museums and Institutions",
                 "text": "Musea en instellingen"
                },
                {
                 "value": "Music",
                 "text": "Muziek"
                },
                {
                 "value": "Nanotechnology",
                 "text": "Nanotechnologie"
                },
                {
                 "value": "Newspapers",
                 "text": "Kranten"
                },
                {
                 "value": "Non-Profit Organisation Management",
                 "text": "Beheer van non-profitorganisaties"
                },
                {
                 "value": "Oil & Energy",
                 "text": "Olie en energie"
                },
                {
                 "value": "Online Media",
                 "text": "Online media"
                },
                {
                 "value": "Other",
                 "text": "Andere"
                },
                {
                 "value": "Outsourcing/Offshoring",
                 "text": "Outsourcing/offshoring"
                },
                {
                 "value": "Package/Freight Delivery",
                 "text": "Pakket-/vrachtvervoer"
                },
                {
                 "value": "Packaging and Containers",
                 "text": "Verpakkingen en containers"
                },
                {
                 "value": "Paper & Forest Products",
                 "text": "Papier- en bosbouwproducten"
                },
                {
                 "value": "Performing Arts",
                 "text": "Podiumkunsten"
                },
                {
                 "value": "Pharmaceuticals",
                 "text": "Farmaceutica"
                },
                {
                 "value": "Philanthropy",
                 "text": "Filantropie"
                },
                {
                 "value": "Photography",
                 "text": "Fotografie"
                },
                {
                 "value": "Plastics",
                 "text": "Kunststoffen"
                },
                {
                 "value": "Political Organisation",
                 "text": "Politieke organisatie"
                },
                {
                 "value": "Primary/Secondary Education",
                 "text": "Primair/secundair onderwijs"
                },
                {
                 "value": "Printing",
                 "text": "Drukkerij"
                },
                {
                 "value": "Professional Training & Coaching",
                 "text": "Professionele opleiding & coaching"
                },
                {
                 "value": "Program Development",
                 "text": "Programmaontwikkeling"
                },
                {
                 "value": "Public Policy",
                 "text": "Publiek beleid"
                },
                {
                 "value": "Public Relations and Communications",
                 "text": "Public relations en communicatie"
                },
                {
                 "value": "Public Safety",
                 "text": "Openbare Veiligheid"
                },
                {
                 "value": "Publishing",
                 "text": "Uitgeverij"
                },
                {
                 "value": "Railroad Manufacture",
                 "text": "Spoorwegproductie"
                },
                {
                 "value": "Ranching",
                 "text": "Veefokkerij"
                },
                {
                 "value": "Real Estate",
                 "text": "Onroerend goed"
                },
                {
                 "value": "Recreational Facilities and Services",
                 "text": "Recreatieve voorzieningen en diensten"
                },
                {
                 "value": "Religious Institutions",
                 "text": "Religieuze instellingen"
                },
                {
                 "value": "Renewables & Environment",
                 "text": "Hernieuwbare energiebronnen en milieu"
                },
                {
                 "value": "Research",
                 "text": "Onderzoek"
                },
                {
                 "value": "Restaurants",
                 "text": "Restaurants"
                },
                {
                 "value": "Retail",
                 "text": "Detailhandel"
                },
                {
                 "value": "Security and Investigations",
                 "text": "Beveiliging en opsporing"
                },
                {
                 "value": "Semiconductors",
                 "text": "Halfgeleiders"
                },
                {
                 "value": "Shipbuilding",
                 "text": "Scheepsbouw"
                },
                {
                 "value": "Sporting Goods",
                 "text": "Sportartikelen"
                },
                {
                 "value": "Sports",
                 "text": "Sport"
                },
                {
                 "value": "Staffing and Recruiting",
                 "text": "Personeel en aanwerving"
                },
                {
                 "value": "Supermarkets",
                 "text": "Supermarkten"
                },
                {
                 "value": "Telecommunications",
                 "text": "Telecommunicatie"
                },
                {
                 "value": "Textiles",
                 "text": "Textiel"
                },
                {
                 "value": "Think Tanks",
                 "text": "Think tanks"
                },
                {
                 "value": "Tobacco",
                 "text": "Tabak"
                },
                {
                 "value": "Translation and Localisation",
                 "text": "Vertaling en lokalisatie"
                },
                {
                 "value": "Transportation/Trucking/Railroad",
                 "text": "Vervoer/Vrachtwagens/Spoorwegen"
                },
                {
                 "value": "Utilities",
                 "text": "Nutsbedrijven"
                },
                {
                 "value": "Venture Capital & Private Equity",
                 "text": "Risicokapitaal en particuliere beleggers"
                },
                {
                 "value": "Veterinary",
                 "text": "Dierenarts"
                },
                {
                 "value": "Warehousing",
                 "text": "Magazijnbeheer"
                },
                {
                 "value": "Wholesale",
                 "text": "Groothandel"
                },
                {
                 "value": "Wine and Spirits",
                 "text": "Wijn en alcoholische dranken"
                },
                {
                 "value": "Wireless",
                 "text": "Draadloos"
                },
                {
                 "value": "Writing and Editing",
                 "text": "Schrijven en redigeren"
                }
               ],
            "requiredError": "Kies een waarde voor dit veld",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Zakelijke telefoon *",
            "requiredError": "Voer een geldig telefoonnummer in",
        },
        "Company" : {
            "type": "text",
            "label": "Naam bedrijf/organisatie *",
            "requiredError": "Dit veld is verplicht",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Bedrijfsopbrengsten",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "Minder dan $200 miljoen"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "$201 miljoen tot $500 miljoen"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "$501 miljoen tot $1 miljard"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "Meer dan $1 miljard"
                }
               ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Bedrijfsgrootte",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "Minder dan 3.000 werknemers"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "3.001 tot 5.000 werknemers"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "5.001 tot 10.000 werknemers"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "Meer dan 10.001 werknemers"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "Land *",
            "options":[
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afghanistan"
                },
                {
                 "value": "Aland Islands",
                 "text": "Aland-eilanden"
                },
                {
                 "value": "Albania",
                 "text": "Albanië"
                },
                {
                 "value": "Algeria",
                 "text": "Algerije"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguilla"
                },
                {
                 "value": "Antarctica",
                 "text": "Antarctica"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antigua en Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentinië"
                },
                {
                 "value": "Armenia",
                 "text": "Armenië"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Australië"
                },
                {
                 "value": "Austria",
                 "text": "Oostenrijk"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbeidzjan"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahama’s"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahrein"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesh"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Belarus"
                },
                {
                 "value": "Belgium",
                 "text": "België"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Benin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermuda"
                },
                {
                 "value": "Bhutan",
                 "text": "Bhutan"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolivia, Plurinationale Staat"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Sint Eustatius en Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bosnië en Herzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botswana"
                },
                {
                 "value": "Brazil",
                 "text": "Brazilië"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Brits Territorium in de Indische Oceaan"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Britse Maagdeneilanden"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgarije"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Cambodja"
                },
                {
                 "value": "Cameroon",
                 "text": "Kameroen"
                },
                {
                 "value": "Canada",
                 "text": "Canada"
                },
                {
                 "value": "Cape Verde",
                 "text": "Kaapverdië"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Kaaimaneilanden"
                },
                {
                 "value": "Central African Republic",
                 "text": "Centraal-Afrikaanse Republiek"
                },
                {
                 "value": "Chad",
                 "text": "Tsjaad"
                },
                {
                 "value": "Chile",
                 "text": "Chili"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Christmas Island",
                 "text": "Christmaseiland"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Cocoseilanden"
                },
                {
                 "value": "Colombia",
                 "text": "Colombia"
                },
                {
                 "value": "Comoros",
                 "text": "Comoren"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, de Democratische Republiek"
                },
                {
                 "value": "Cook Islands",
                 "text": "Cookeilanden"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Ivoorkust"
                },
                {
                 "value": "Crimea Region",
                 "text": "Regio Krim"
                },
                {
                 "value": "Croatia",
                 "text": "Kroatië"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Cyprus",
                 "text": "Cyprus"
                },
                {
                 "value": "Czech Republic",
                 "text": "Tsjechië"
                },
                {
                 "value": "Denmark",
                 "text": "Denemarken"
                },
                {
                 "value": "Djibouti",
                 "text": "Djibouti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "Dominicaanse Republiek"
                },
                {
                 "value": "Ecuador",
                 "text": "Ecuador"
                },
                {
                 "value": "Egypt",
                 "text": "Egypte"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Equatoriaal-Guinea"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritrea"
                },
                {
                 "value": "Estonia",
                 "text": "Estland"
                },
                {
                 "value": "Ethiopia",
                 "text": "Ethiopië"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Falklandeilanden (Malvinas)"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Faeröer"
                },
                {
                 "value": "Fiji",
                 "text": "Fiji"
                },
                {
                 "value": "Finland",
                 "text": "Finland"
                },
                {
                 "value": "France",
                 "text": "Frankrijk"
                },
                {
                 "value": "French Guiana",
                 "text": "Frans-Guyana"
                },
                {
                 "value": "French Polynesia",
                 "text": "Frans-Polynesië"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Franse Zuidelijke Gebieden"
                },
                {
                 "value": "Gabon",
                 "text": "Gabon"
                },
                {
                 "value": "Gambia",
                 "text": "Gambia"
                },
                {
                 "value": "Georgia",
                 "text": "Georgië"
                },
                {
                 "value": "Germany",
                 "text": "Duitsland"
                },
                {
                 "value": "Ghana",
                 "text": "Ghana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Griekenland"
                },
                {
                 "value": "Greenland",
                 "text": "Groenland"
                },
                {
                 "value": "Grenada",
                 "text": "Grenada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadeloupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guinea"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guinee-Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guyana"
                },
                {
                 "value": "Haiti",
                 "text": "Haïti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Heard en McDonaldeilanden"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Vaticaanstad"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Hongkong S.A.R., China"
                },
                {
                 "value": "Hungary",
                 "text": "Hongarije"
                },
                {
                 "value": "Iceland",
                 "text": "IJsland"
                },
                {
                 "value": "India",
                 "text": "India"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonesië"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Iran, Islamitische Republiek"
                },
                {
                 "value": "Iraq",
                 "text": "Irak"
                },
                {
                 "value": "Ireland",
                 "text": "Ierland"
                },
                {
                 "value": "Isle of Man",
                 "text": "Isle of Man"
                },
                {
                 "value": "Israel",
                 "text": "Israël"
                },
                {
                 "value": "Italy",
                 "text": "Italië"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaica"
                },
                {
                 "value": "Japan",
                 "text": "Japan"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordan"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Kazachstan"
                },
                {
                 "value": "Kenya",
                 "text": "Kenia"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Korea, Democratische Volksrepubliek"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Korea, Republiek"
                },
                {
                 "value": "Kuwait",
                 "text": "Koeweit"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Kyrgyzstan"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "Laos, Democratische Volksrepubliek"
                },
                {
                 "value": "Latvia",
                 "text": "Letland"
                },
                {
                 "value": "Lebanon",
                 "text": "Libanon"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesotho"
                },
                {
                 "value": "Liberia",
                 "text": "Liberia"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Libië"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Litouwen"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxemburg"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Macau S.A.R., China"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macedonië, de voormalige Joegoslavische Republiek"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagaskar"
                },
                {
                 "value": "Malawi",
                 "text": "Malawi"
                },
                {
                 "value": "Malaysia",
                 "text": "Maleisië"
                },
                {
                 "value": "Maldives",
                 "text": "Maldiven"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Marshalleilanden"
                },
                {
                 "value": "Martinique",
                 "text": "Martinique"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritanië"
                },
                {
                 "value": "Mauritius",
                 "text": "Mauritius"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "MexicoMX"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronesia, Federale Staten van"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldavië, Republiek"
                },
                {
                 "value": "Monaco",
                 "text": "Monaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongolië"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Marokko"
                },
                {
                 "value": "Mozambique",
                 "text": "Mozambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Myanmar"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "Noordelijke Marianen"
                },
                {
                 "value": "Namibia",
                 "text": "Namibië"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Nederland"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Nederlandse Antillen"
                },
                {
                 "value": "New Caledonia",
                 "text": "Nieuw-Caledonië"
                },
                {
                 "value": "New Zealand",
                 "text": "Nieuw-Zeeland"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicaragua"
                },
                {
                 "value": "Niger",
                 "text": "Niger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigeria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Norfolk"
                },
                {
                 "value": "North Korea",
                 "text": "Noord-Korea"
                },
                {
                 "value": "Norway",
                 "text": "Noorwegen"
                },
                {
                 "value": "Oman",
                 "text": "Oman"
                },
                {
                 "value": "Pakistan",
                 "text": "Pakistan"
                },
                {
                 "value": "Palau",
                 "text": "Palau"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Palestijnse Gebieden"
                },
                {
                 "value": "Panama",
                 "text": "Panama"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papoea-Nieuw-Guinea"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguay"
                },
                {
                 "value": "Peru",
                 "text": "Peru"
                },
                {
                 "value": "Philippines",
                 "text": "Filipijnen"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairneilanden"
                },
                {
                 "value": "Poland",
                 "text": "Polen"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Puerto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Qatar"
                },
                {
                 "value": "Reunion",
                 "text": "Réunion"
                },
                {
                 "value": "Romania",
                 "text": "Roemenië"
                },
                {
                 "value": "Russian Federation",
                 "text": "Rusland"
                },
                {
                 "value": "Rwanda",
                 "text": "Rwanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "Saint-Barthélemy"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Sint-Helena, Ascension en Tristan da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "Saint Kitts en Nevis"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Saint Lucia"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "Sint-Maarten (Frans gedeelte)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "Saint-Pierre en Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "Saint Vincent en de Grenadines"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, Amerikaans"
                },
                {
                 "value": "San Marino",
                 "text": "San Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "Sao Tomé en Principe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Saoedi-Arabië"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Servië"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychellen"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Sierra Leone"
                },
                {
                 "value": "Singapore",
                 "text": "Singapore"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint-Maarten (Nederlands deel)"
                },
                {
                 "value": "Slovakia",
                 "text": "Slowakije"
                },
                {
                 "value": "Slovenia",
                 "text": "Slovenië"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Salomonseilanden"
                },
                {
                 "value": "Somalia",
                 "text": "Somalië"
                },
                {
                 "value": "South Africa",
                 "text": "Zuid-Afrika"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Zuid-Georgië en de Zuidelijke Sandwicheilanden"
                },
                {
                 "value": "South Sudan",
                 "text": "Zuid-Soedan"
                },
                {
                 "value": "Spain",
                 "text": "Spanje"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Soedan"
                },
                {
                 "value": "Suriname",
                 "text": "Suriname"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard en Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Swaziland"
                },
                {
                 "value": "Sweden",
                 "text": "Zweden"
                },
                {
                 "value": "Switzerland",
                 "text": "Zwitserland"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "Syrische Arabische Republiek"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tadzjikistan"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzania, Verenigde Republiek"
                },
                {
                 "value": "Thailand",
                 "text": "Thailand"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Oost-Timor"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad en Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunesië"
                },
                {
                 "value": "Turkey",
                 "text": "Turkije"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turkmenistan"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Turks- en Caicoseilanden"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Oekraïne"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Verenigde Arabische Emiraten"
                },
                {
                 "value": "United Kingdom",
                 "text": "Verenigd Koninkrijk"
                },
                {
                 "value": "United States",
                 "text": "Verenigde Staten"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguay"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "Amerikaanse Kleinere Afgelegen Eilanden"
                },
                {
                 "value": "Uzbekistan",
                 "text": "Oezbekistan"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, Bolivariaanse Republiek"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnam"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Maagdeneilanden, Britse"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Maagdeneilanden, Amerikaanse"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis en Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Westelijke Sahara"
                },
                {
                 "value": "Yemen",
                 "text": "Jemen"
                },
                {
                 "value": "Zambia",
                 "text": "Zambia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbabwe"
                }
               ]
            ,
            "requiredError": "Kies een waarde voor dit veld",
        },
        "State": {
            "type": "select",
            "label": "Deelstaat *",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alaska"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "California"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Florida"
                },
                {
                 "value": "GA",
                 "text": "Georgia"
                },
                {
                 "value": "HI",
                 "text": "Hawaii"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississippi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "New Jersey"
                },
                {
                 "value": "NM",
                 "text": "New Mexico"
                },
                {
                 "value": "NY",
                 "text": "New York"
                },
                {
                 "value": "NC",
                 "text": "North Carolina"
                },
                {
                 "value": "ND",
                 "text": "North Dakota"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pennsylvania"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "South Carolina"
                },
                {
                 "value": "SD",
                 "text": "South Dakota"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virginia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "West Virginia"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Kies een waarde voor dit veld",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Functie",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Accountant/Controller"
                },
                {
                 "value": "Account Manager",
                 "text": "Account Manager"
                },
                {
                 "value": "Assistant",
                 "text": "Assistent"
                },
                {
                 "value": "Branch Manager",
                 "text": "Filiaalmanager"
                },
                {
                 "value": "Chairman",
                 "text": "Voorzitter"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Chief Executive Officer"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Chief Digital Officer"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Chief Executive Officer"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Chief Financial Officer"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Chief Information Officer"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Chief Marketing Officer"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Chief Medical Officer"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Chief Operations Officer"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Chief Procurement Officer"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Chief Risk Officer"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Chief Security Officer"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Chief Technology Officer"
                },
                {
                 "value": "Commercial Director",
                 "text": "Commercial Director"
                },
                {
                 "value": "Consultant",
                 "text": "Consultant"
                },
                {
                 "value": "Customer Experience",
                 "text": "Klantervaring"
                },
                {
                 "value": "Customer Service",
                 "text": "Klantenservice"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Digitale transformatie"
                },
                {
                 "value": "Director- General",
                 "text": "Directeur-generaal"
                },
                {
                 "value": "Director - Other",
                 "text": "Directeur - andere"
                },
                {
                 "value": "Director others",
                 "text": "Directeur - andere"
                },
                {
                 "value": "Distribution Director",
                 "text": "Directeur Distributie"
                },
                {
                 "value": "Financial Director",
                 "text": "Financieel Directeur"
                },
                {
                 "value": "HR Director",
                 "text": "Directeur HR"
                },
                {
                 "value": "HR Manager",
                 "text": "HR Manager"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "IT-toepassingbeheer"
                },
                {
                 "value": "IT Consulting",
                 "text": "IT-consultant"
                },
                {
                 "value": "IT Director",
                 "text": "IT-directeur"
                },
                {
                 "value": "IT Manager",
                 "text": "IT-manager"
                },
                {
                 "value": "IT Operations",
                 "text": "IT-operaties"
                },
                {
                 "value": "IT Strategy",
                 "text": "IT-strategie"
                },
                {
                 "value": "IT System Integration",
                 "text": "IT-systeemintegratie"
                },
                {
                 "value": "Management others",
                 "text": "Management - andere"
                },
                {
                 "value": "Managing Director",
                 "text": "Managing Director"
                },
                {
                 "value": "Managing Partner",
                 "text": "Beherend vennoot"
                },
                {
                 "value": "MarCom Manager",
                 "text": "MarCom Manager"
                },
                {
                 "value": "Marketing Director",
                 "text": "Marketingdirecteur"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Lid van de Raad van Bestuur"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Lid van de Raad van Toezicht"
                },
                {
                 "value": "Minister",
                 "text": "Minister"
                },
                {
                 "value": "Minister of State",
                 "text": "Minister van Staat"
                },
                {
                 "value": "Nursing",
                 "text": "Verpleging"
                },
                {
                 "value": "Operations Director",
                 "text": "Directeur Operaties"
                },
                {
                 "value": "Other",
                 "text": "Andere"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Assistent"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Voorzitter Raad van Bestuur"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Voorzitter Raad van Commissarissen"
                },
                {
                 "value": "Press",
                 "text": "Pers"
                },
                {
                 "value": "Procurement",
                 "text": "Inkoop"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Public Relations Manager"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Manager Public Relations"
                },
                {
                 "value": "Sales Director",
                 "text": "Directeur Verkoop"
                },
                {
                 "value": "Sales Manager",
                 "text": "Verkoopmanager"
                },
                {
                 "value": "Secretary",
                 "text": "Secretaris"
                },
                {
                 "value": "State Secretary",
                 "text": "Staatssecretaris"
                },
                {
                 "value": "Supervisor",
                 "text": "Toezichthouder"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vice-voorzitter"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vice-voorzitter Raad van Bestuur"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vice-voorzitter Raad van Commissarissen"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Functieomschrijving",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Product *",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "IAM solution",
                 "text": "Identiteits- en toegangsbeheer (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Eenmalige aanmelding (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Beheer van sterke authenticatie"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Identiteitsgovernance en -beheer"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Webtoegangsbeheer"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (identiteit als dienst)"
                },
                {
                 "value": "High Availability",
                 "text": "Hoge beschikbaarheid (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Intelligente identiteitsanalyse"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Andere"
                }
               ],
            "requiredError": "Kies een waarde voor dit veld",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Type verzoek *",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Product Information",
                 "text": "Informatie"
                },
                {
                 "value": "Price Quote",
                 "text": "Prijs"
                },
                {
                 "value": "Demo",
                 "text": "Demonstratie"
                },
                {
                 "value": "Free trial package",
                 "text": "Proef"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Training en certificering"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Nieuwe oplossing of diensten voor uw bedrijf"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Product-/klantondersteuning (alleen huidige Eviden-klanten)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Boekhouding, facturering of betalingen"
                },
                {
                 "value": "Job Information",
                 "text": "Omschrijving werk"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Pers"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Verkopen aan Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Alliantie/partnerschap"
                },
                {
                 "value": "Other",
                 "text": "Andere"
                }
               ],
            "requiredError": "Kies een waarde voor dit veld",
        },
        "enquiry" : {
            "type": "text",
            "label": "Verzoek",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Aankoopmachtiging",
            "options": [
                {
                    "value": "", 
                    "text": "Selecteer"
                },
                {
                    "value": "Yes", 
                    "text": "Ja"
                },
                {
                    "value": "No", 
                    "text": "Nee"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Tijdlijn van aankoop",
            "options": [
                {
                 "value": "",
                 "text": "Selecteer"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Minder dan 3 maanden"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "3 tot 6 maanden"
                },
                {
                 "value": "6 to 12 months",
                 "text": "6 tot 12 maanden"
                },
                {
                 "value": "Over 12 months",
                 "text": "Meer dan 12 maanden"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Toestemming voor communicatie *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Ja"
                },
                {
                    "value": "no", 
                    "text": "Nee"
                }
            ],
            "requiredError": "Kies een waarde voor dit veld",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Uw privacy is belangrijk voor ons. In uw land geniet u van rechten onder de AVG. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegerandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "DPA",
             "text": "Uw privacy is belangrijk voor ons. In uw land geniet u van rechten onder de DPA. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "CCPA",
             "text": "Uw privacy is belangrijk voor ons. In uw land geniet u van rechten onder de CCPA/CPRA. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "CASL",
             "text": "Uw privacy is belangrijk voor ons. In uw land geniet u van rechten onder de CASL. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "LGDP",
             "text": "Uw privacy is belangrijk voor ons. In u land geniet u van rechten onder de LGPD. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "POPIA",
             "text": "Uw privacy is belangrijk voor ons. In uw land geniet u van rechten onder de POPIA. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "LFPDPPP",
             "text": "Uw privacy is belangrijk voor ons. In uw land geniet u van rechten onder de LFPDPPP. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd en hoe u uw gegevens kunt verwijderen als u dat wenst."
            },
            {
             "value": "none",
             "text": "Uw privacy is belangrijk voor ons. Door dit formulier in te dienen, aanvaardt u de voorwaarden in ons Privacybeleid. Lees dit beleid om te weten hoe wij ervoor zorgen dat uw rechten worden gegarandeerd."
            }
        ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Om er zeker van te zijn dat u relevante berichten van Eviden ontvangt over onze evenementen en aanbiedingen, vragen we u om u aan te melden. U kunt zich op elk moment weer afmelden."
            },
            {
                "value": "CCPA",
                "text": "Door uw gegevens op dit formulier in te vullen, stemt u ermee in dat u mededelingen van Eviden over onze evenementen en aanbiedingen ontvangt in overeenstemming met ons Privacybeleid. U kunt zich op elk moment uitschrijven."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Verzenden"
        },
        "ThankYouEmptyDataContent" : "Dank u voor uw interesse.",
        "ThankYouDataContent" : "Dank u voor uw interesse in",
        "DownloadLinkText" : "U kunt het verslag hier downloaden.",
        "ContactTYText" : "Een lid van ons team zal binnenkort contact met u opnemen"
    },

    "Brazilian Portuguese": {
        "preferredLanguage" : {
            "type": "select",
            "label": "Idioma de preferência",
            "options": [
                {
                    "value": "",
                    "text": "Selecione"
                   },
                   {
                    "value": "English GB",
                    "text": "Inglês - Reino Unido"
                   },
                   {
                    "value": "English US",
                    "text": "Inglês - americano"
                   },
                   {
                    "value": "French",
                    "text": "Francês"
                   },
                   {
                    "value": "Italian",
                    "text": "Italiano"
                   },
                   {
                    "value": "German",
                    "text": "Alemão"
                   },
                   {
                    "value": "Latin American Spanish",
                    "text": "Espanhol latino-americano"
                   },
                   {
                    "value": "European Spanish",
                    "text": "Espanhol europeu"
                   },
                   {
                    "value": "Dutch",
                    "text": "Holandês"
                   },
                   {
                    "value": "Brazilian Portuguese",
                    "text": "Português do Brasil"
                   },
                   {
                    "value": "Japanese",
                    "text": "Japonês"
                   }
            ]
            },
        "Salutation" : {
            "type": "select",
            "label": "Saudação",
            "options": [
                {
                    "value": "",
                    "text": "Selecione"
                   },
                   {
                    "value": "Sr.",
                    "text": "Sr."
                   },
                   {
                    "value": "Sra.",
                    "text": "Sra."
                   },
                   {
                    "value": "Srta.",
                    "text": "Srta."
                   },
                   {
                    "value": "Sx.",
                    "text": "Sx."
                   },
                   {
                    "value": "Master",
                    "text": "Master"
                   },
                   {
                    "value": "Sir",
                    "text": "Sir"
                   },
                   {
                    "value": "Dr.",
                    "text": "Dr."
                   }
            ]
            },
        "FirstName": {
            "type": "text",
            "label": "Nome *",
            "requiredError": "Este campo é obrigatório",
            },
        "LastName": {
            "type": "text",
            "label": "Sobrenome *",
            "requiredError": "Este campo é obrigatório",
            },        
        "Email" : {
            "type": "email",
            "label": "Endereço de e-mail comercial *",
            "requiredError": "Digite um endereço de e-mail válido",
        },
        "customerIndustry" : {
            "type": "select",
            "label": "Indústria *",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Accounting",
                 "text": "Contabilidade"
                },
                {
                 "value": "Airlines/Aviation",
                 "text": "Companhias aéreas/aviação"
                },
                {
                 "value": "Alternative Dispute Resolution",
                 "text": "Resolução de disputa alternativa"
                },
                {
                 "value": "Alternative Medicine",
                 "text": "Medicina alternativa"
                },
                {
                 "value": "Animation",
                 "text": "Animação"
                },
                {
                 "value": "Apparel & Fashion",
                 "text": "Moda e vestuário"
                },
                {
                 "value": "Architecture & Planning",
                 "text": "Arquitetura e planejamento"
                },
                {
                 "value": "Arts and Crafts",
                 "text": "Arte e artesanato"
                },
                {
                 "value": "Automotive",
                 "text": "Automotivo"
                },
                {
                 "value": "Aviation & Aerospace",
                 "text": "Aviação e aeroespacial"
                },
                {
                 "value": "Banking",
                 "text": "Bancário"
                },
                {
                 "value": "Biotechnology",
                 "text": "Biotecnologia"
                },
                {
                 "value": "Broadcast Media",
                 "text": "Meios de transmissão"
                },
                {
                 "value": "Building Materials",
                 "text": "Materiais de construção"
                },
                {
                 "value": "Business Supplies and Equipment",
                 "text": "Equipamento e materiais de negócios"
                },
                {
                 "value": "Capital Markets",
                 "text": "Mercados de capital"
                },
                {
                 "value": "Chemicals",
                 "text": "Produtos químicos"
                },
                {
                 "value": "Civic & Social Organisation",
                 "text": "Organização cívica e social"
                },
                {
                 "value": "Civil Engineering",
                 "text": "Engenharia civil"
                },
                {
                 "value": "Commercial Real Estate",
                 "text": "Bens imóveis comerciais"
                },
                {
                 "value": "Computer & Network Security",
                 "text": "Segurança de computadores e redes"
                },
                {
                 "value": "Computer Games",
                 "text": "Jogos de computador"
                },
                {
                 "value": "Computer Hardware",
                 "text": "Hardware para computadores"
                },
                {
                 "value": "Computer Networking",
                 "text": "Rede de computadores"
                },
                {
                 "value": "Computer Software",
                 "text": "Software de computador"
                },
                {
                 "value": "Construction",
                 "text": "Construção"
                },
                {
                 "value": "Consumer Electronics",
                 "text": "Eletrônicos de consumo"
                },
                {
                 "value": "Consumer Goods",
                 "text": "Bens de consumo"
                },
                {
                 "value": "Consumer Services",
                 "text": "Serviços ao consumidor"
                },
                {
                 "value": "Cosmetics",
                 "text": "Cosméticos"
                },
                {
                 "value": "Dairy",
                 "text": "Laticínios"
                },
                {
                 "value": "Defence & Space",
                 "text": "Defesa e espaço"
                },
                {
                 "value": "Design",
                 "text": "Desenho"
                },
                {
                 "value": "Education Management",
                 "text": "Gestão educacional"
                },
                {
                 "value": "E-Learning",
                 "text": "Ensino à distância"
                },
                {
                 "value": "Electrical/Electronic Manufacturing",
                 "text": "Fabricação elétrica/eletrônica"
                },
                {
                 "value": "Entertainment",
                 "text": "Entretenimento"
                },
                {
                 "value": "Environmental Services",
                 "text": "Serviços ambientais"
                },
                {
                 "value": "Events Services",
                 "text": "Serviços para eventos"
                },
                {
                 "value": "Executive Office",
                 "text": "Escritório executivo"
                },
                {
                 "value": "Facilities Services",
                 "text": "Serviços de instalações"
                },
                {
                 "value": "Farming",
                 "text": "Agropecuária"
                },
                {
                 "value": "Financial Services",
                 "text": "Serviços financeiros"
                },
                {
                 "value": "Fine Art",
                 "text": "Artes plásticas"
                },
                {
                 "value": "Fishery",
                 "text": "Pescaria"
                },
                {
                 "value": "Food & Beverages",
                 "text": "Alimentos & Bebidas"
                },
                {
                 "value": "Food Production",
                 "text": "Produção de alimentos"
                },
                {
                 "value": "Fund-Raising",
                 "text": "Arrecadação de fundos"
                },
                {
                 "value": "Furniture",
                 "text": "Móveis"
                },
                {
                 "value": "Gambling & Casinos",
                 "text": "Jogos e cassino"
                },
                {
                 "value": "Glass, Ceramics & Concrete",
                 "text": "Vidro, cerâmica e concreto"
                },
                {
                 "value": "Government Administration",
                 "text": "Administração governamental"
                },
                {
                 "value": "Government Relations",
                 "text": "Relações governamentais"
                },
                {
                 "value": "Graphic Design",
                 "text": "Desenho gráfico"
                },
                {
                 "value": "Health, Wellness and Fitness",
                 "text": "Saúde e bem-estar"
                },
                {
                 "value": "Higher Education",
                 "text": "Educação superior"
                },
                {
                 "value": "Hospital & Health Care",
                 "text": "Hospitais e cuidados com a saúde"
                },
                {
                 "value": "Hospitality",
                 "text": "Hospitalidade"
                },
                {
                 "value": "Human Resources",
                 "text": "Recursos Humanos"
                },
                {
                 "value": "Import and Export",
                 "text": "Importação e exportação"
                },
                {
                 "value": "Individual & Family Services",
                 "text": "Serviços para famílias e indivíduos"
                },
                {
                 "value": "Industrial Automation",
                 "text": "Automação industrial"
                },
                {
                 "value": "Information Services",
                 "text": "Serviços de informação"
                },
                {
                 "value": "Information Technology and Services",
                 "text": "Serviços e tecnologia da informação"
                },
                {
                 "value": "Insurance",
                 "text": "Seguros"
                },
                {
                 "value": "International Affairs",
                 "text": "Assuntos Internacionais"
                },
                {
                 "value": "International Trade and Development",
                 "text": "Desenvolvimento e comércio internacional"
                },
                {
                 "value": "Internet",
                 "text": "Internet"
                },
                {
                 "value": "Investment Banking",
                 "text": "Investimento bancário"
                },
                {
                 "value": "Investment Management",
                 "text": "Gestão de investimentos"
                },
                {
                 "value": "Judiciary",
                 "text": "Judiciário"
                },
                {
                 "value": "Law Enforcement",
                 "text": "Aplicação da lei"
                },
                {
                 "value": "Law Practice",
                 "text": "Prática legal"
                },
                {
                 "value": "Legal Services",
                 "text": "Serviços jurídicos"
                },
                {
                 "value": "Legislative Office",
                 "text": "Escritório legislativo"
                },
                {
                 "value": "Leisure, Travel & Tourism",
                 "text": "Lazer, viagem e turismo"
                },
                {
                 "value": "Libraries",
                 "text": "Bibliotecas"
                },
                {
                 "value": "Logistics and Supply Chain",
                 "text": "Logística e cadeia de abastecimento"
                },
                {
                 "value": "Luxury Goods & Jewellery",
                 "text": "Bens de luxo e joias"
                },
                {
                 "value": "Machinery",
                 "text": "Maquinário"
                },
                {
                 "value": "Management Consulting",
                 "text": "Consultoria de gestão"
                },
                {
                 "value": "Maritime",
                 "text": "Marítimo"
                },
                {
                 "value": "Market Research",
                 "text": "Pesquisa de mercado"
                },
                {
                 "value": "Marketing and Advertising",
                 "text": "Propaganda e marketing"
                },
                {
                 "value": "Mechanical or Industrial Engineering",
                 "text": "Engenharia mecânica e industrial"
                },
                {
                 "value": "Media Production",
                 "text": "Produção de mídia"
                },
                {
                 "value": "Medical Devices",
                 "text": "Dispositivos médicos"
                },
                {
                 "value": "Medical Practice",
                 "text": "Prática médica"
                },
                {
                 "value": "Mental Health Care",
                 "text": "Cuidados com a saúde mental"
                },
                {
                 "value": "Military",
                 "text": "Militar"
                },
                {
                 "value": "Mining & Metals",
                 "text": "Mineração e metais"
                },
                {
                 "value": "Mobile Games",
                 "text": "Jogos móveis"
                },
                {
                 "value": "Motion Pictures and Film",
                 "text": "Filmes"
                },
                {
                 "value": "Museums and Institutions",
                 "text": "Museus e instituições"
                },
                {
                 "value": "Music",
                 "text": "Música"
                },
                {
                 "value": "Nanotechnology",
                 "text": "Nanotecnologia"
                },
                {
                 "value": "Newspapers",
                 "text": "Jornais"
                },
                {
                 "value": "Non-Profit Organisation Management",
                 "text": "Gestão de organizações sem fins lucrativos"
                },
                {
                 "value": "Oil & Energy",
                 "text": "Petróleo e Energia"
                },
                {
                 "value": "Online Media",
                 "text": "Mídia online"
                },
                {
                 "value": "Other",
                 "text": "Outros"
                },
                {
                 "value": "Outsourcing/Offshoring",
                 "text": "Terceirização/Offshoring"
                },
                {
                 "value": "Package/Freight Delivery",
                 "text": "Entrega de pacotes /frete"
                },
                {
                 "value": "Packaging and Containers",
                 "text": "Embalagens e Containers"
                },
                {
                 "value": "Paper & Forest Products",
                 "text": "Papel e produtos florestais"
                },
                {
                 "value": "Performing Arts",
                 "text": "Artes cênicas"
                },
                {
                 "value": "Pharmaceuticals",
                 "text": "Farmacêutica"
                },
                {
                 "value": "Philanthropy",
                 "text": "Filantropia"
                },
                {
                 "value": "Photography",
                 "text": "Fotografia"
                },
                {
                 "value": "Plastics",
                 "text": "Plástico"
                },
                {
                 "value": "Political Organisation",
                 "text": "Organização política"
                },
                {
                 "value": "Primary/Secondary Education",
                 "text": "Ensino fundamental/médio"
                },
                {
                 "value": "Printing",
                 "text": "Impressão"
                },
                {
                 "value": "Professional Training & Coaching",
                 "text": "Treinamento profissional"
                },
                {
                 "value": "Program Development",
                 "text": "Desenvolvimento de programa"
                },
                {
                 "value": "Public Policy",
                 "text": "Política pública"
                },
                {
                 "value": "Public Relations and Communications",
                 "text": "Relações públicas e comunicação"
                },
                {
                 "value": "Public Safety",
                 "text": "Segurança Pública"
                },
                {
                 "value": "Publishing",
                 "text": "Publicação"
                },
                {
                 "value": "Railroad Manufacture",
                 "text": "Fabricação de ferrovias"
                },
                {
                 "value": "Ranching",
                 "text": "Pecuária"
                },
                {
                 "value": "Real Estate",
                 "text": "Imóveis"
                },
                {
                 "value": "Recreational Facilities and Services",
                 "text": "Instalações e serviços recreativos"
                },
                {
                 "value": "Religious Institutions",
                 "text": "Instituições Religiosas"
                },
                {
                 "value": "Renewables & Environment",
                 "text": "Renováveis & Meio Ambiente"
                },
                {
                 "value": "Research",
                 "text": "Pesquisa"
                },
                {
                 "value": "Restaurants",
                 "text": "Restaurantes"
                },
                {
                 "value": "Retail",
                 "text": "Varejo"
                },
                {
                 "value": "Security and Investigations",
                 "text": "Segurança e Investigações"
                },
                {
                 "value": "Semiconductors",
                 "text": "Semicondutores"
                },
                {
                 "value": "Shipbuilding",
                 "text": "Construção naval"
                },
                {
                 "value": "Sporting Goods",
                 "text": "Bens esportivos"
                },
                {
                 "value": "Sports",
                 "text": "Esportes"
                },
                {
                 "value": "Staffing and Recruiting",
                 "text": "Recrutamento e recrutamento de pessoal"
                },
                {
                 "value": "Supermarkets",
                 "text": "Supermercados"
                },
                {
                 "value": "Telecommunications",
                 "text": "Telecomunicações"
                },
                {
                 "value": "Textiles",
                 "text": "Têxteis"
                },
                {
                 "value": "Think Tanks",
                 "text": "Grupos de reflexão"
                },
                {
                 "value": "Tobacco",
                 "text": "Tabaco"
                },
                {
                 "value": "Translation and Localisation",
                 "text": "Tradução e localização"
                },
                {
                 "value": "Transportation/Trucking/Railroad",
                 "text": "Transporte/Caminhão/Ferrovia"
                },
                {
                 "value": "Utilities",
                 "text": "Utilidades"
                },
                {
                 "value": "Venture Capital & Private Equity",
                 "text": "Capital de risco e capital privado"
                },
                {
                 "value": "Veterinary",
                 "text": "Veterinário"
                },
                {
                 "value": "Warehousing",
                 "text": "Armazenagem"
                },
                {
                 "value": "Wholesale",
                 "text": "Venda por atacado"
                },
                {
                 "value": "Wine and Spirits",
                 "text": "Vinhos e bebidas alcoólicas"
                },
                {
                 "value": "Wireless",
                 "text": "Conexão sem fio"
                },
                {
                 "value": "Writing and Editing",
                 "text": "Texto e edição"
                }
               ],
            "requiredError": "Selecione um valor para este campo",
        },
        "Phone" : {
            "type": "telephone",
            "label": "Telefone comercial *",
            "requiredError": "Digite um número de telefone válido",
        },
        "Company" : {
            "type": "text",
            "label": "Nome da empresa/organização *",
            "requiredError": "Este campo é obrigatório",
        },
        "Company_Revenue__c" : {
            "type": "select",
            "label": "Receita da empresa",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Smaller than $200mil",
                 "text": "Menos que $200mil"
                },
                {
                 "value": "$201mil to $500mil",
                 "text": "De $201mil a $500mil"
                },
                {
                 "value": "$501mil to $1bil",
                 "text": "De $501mil a $1bi"
                },
                {
                 "value": "Greater than $1bil",
                 "text": "Mais de $1bi"
                }
               ]
        },
        "Company_Size__c" : {
            "type": "select",
            "label": "Tamanho da empresa",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Smaller than 3,000 Employees",
                 "text": "Menos de 3.000 funcionários"
                },
                {
                 "value": "3,001 to 5,000 Employees",
                 "text": "3.001 a 5.000 funcionários"
                },
                {
                 "value": "5,001 to 10,000 Employees",
                 "text": "5.001 a 10.000 funcionários"
                },
                {
                 "value": "Greater than 10,001 Employees",
                 "text": "Mais de 10.001 funcionários"
                }
               ]
        },
        "Country": {
            "type": "select",
            "label": "País *",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Afghanistan",
                 "text": "Afeganistão"
                },
                {
                 "value": "Aland Islands",
                 "text": "Ilhas Aland"
                },
                {
                 "value": "Albania",
                 "text": "Albânia"
                },
                {
                 "value": "Algeria",
                 "text": "Argélia"
                },
                {
                 "value": "Andorra",
                 "text": "Andorra"
                },
                {
                 "value": "Angola",
                 "text": "Angola"
                },
                {
                 "value": "Anguilla",
                 "text": "Anguila"
                },
                {
                 "value": "Antarctica",
                 "text": "Antártica"
                },
                {
                 "value": "Antigua and Barbuda",
                 "text": "Antígua e Barbuda"
                },
                {
                 "value": "Argentina",
                 "text": "Argentina"
                },
                {
                 "value": "Armenia",
                 "text": "Armênia"
                },
                {
                 "value": "Aruba",
                 "text": "Aruba"
                },
                {
                 "value": "Australia",
                 "text": "Austrália"
                },
                {
                 "value": "Austria",
                 "text": "Áustria"
                },
                {
                 "value": "Azerbaijan",
                 "text": "Azerbaijão"
                },
                {
                 "value": "Bahamas",
                 "text": "Bahamas"
                },
                {
                 "value": "Bahrain",
                 "text": "Bahrein"
                },
                {
                 "value": "Bangladesh",
                 "text": "Bangladesh"
                },
                {
                 "value": "Barbados",
                 "text": "Barbados"
                },
                {
                 "value": "BelarusBelarus",
                 "text": "Belarus"
                },
                {
                 "value": "Belgium",
                 "text": "Bélgica"
                },
                {
                 "value": "Belize",
                 "text": "Belize"
                },
                {
                 "value": "Benin",
                 "text": "Benin"
                },
                {
                 "value": "Bermuda",
                 "text": "Bermudas"
                },
                {
                 "value": "Bhutan",
                 "text": "Butão"
                },
                {
                 "value": "Bolivia, Plurinational State of",
                 "text": "Bolívia, Estado Plurinacional de"
                },
                {
                 "value": "Bonaire, Sint Eustatius and Saba",
                 "text": "Bonaire, Sint Eustatius e Saba"
                },
                {
                 "value": "Bosnia and Herzegovina",
                 "text": "Bósnia e Herzegovina"
                },
                {
                 "value": "Botswana",
                 "text": "Botsuana"
                },
                {
                 "value": "Brazil",
                 "text": "Brasil"
                },
                {
                 "value": "British Indian Ocean Territory",
                 "text": "Território Britânico do Oceano Índico"
                },
                {
                 "value": "British Virgin Islands",
                 "text": "Ilhas Virgens Britânicas"
                },
                {
                 "value": "Brunei Darussalam",
                 "text": "Brunei Darussalam"
                },
                {
                 "value": "Bulgaria",
                 "text": "Bulgária"
                },
                {
                 "value": "Burkina Faso",
                 "text": "Burkina Faso"
                },
                {
                 "value": "Burundi",
                 "text": "Burundi"
                },
                {
                 "value": "Cambodia",
                 "text": "Camboja"
                },
                {
                 "value": "Cameroon",
                 "text": "Camarões"
                },
                {
                 "value": "Canada",
                 "text": "Canadá"
                },
                {
                 "value": "Cape Verde",
                 "text": "Cabo Verde"
                },
                {
                 "value": "Cayman Islands",
                 "text": "Ilhas Cayman"
                },
                {
                 "value": "Central African Republic",
                 "text": "República Centro-Africana"
                },
                {
                 "value": "Chad",
                 "text": "Chade"
                },
                {
                 "value": "Chile",
                 "text": "Chile"
                },
                {
                 "value": "China",
                 "text": "China"
                },
                {
                 "value": "Christmas Island",
                 "text": "Ilha de Natal"
                },
                {
                 "value": "Cocos (Keeling) Islands",
                 "text": "Ilhas Cocos (Keeling)"
                },
                {
                 "value": "Colombia",
                 "text": "Colômbia"
                },
                {
                 "value": "Comoros",
                 "text": "Comores"
                },
                {
                 "value": "Congo",
                 "text": "Congo"
                },
                {
                 "value": "Congo, the Democratic Republic of the",
                 "text": "Congo, a República Democrática do"
                },
                {
                 "value": "Cook Islands",
                 "text": "Ilhas Cook"
                },
                {
                 "value": "Costa Rica",
                 "text": "Costa Rica"
                },
                {
                 "value": "Cote d'Ivoire",
                 "text": "Costa do Marfim"
                },
                {
                 "value": "Crimea Region",
                 "text": "Região da Crimeia"
                },
                {
                 "value": "Croatia",
                 "text": "Croácia"
                },
                {
                 "value": "Cuba",
                 "text": "Cuba"
                },
                {
                 "value": "Curaçao",
                 "text": "Curaçao"
                },
                {
                 "value": "Cyprus",
                 "text": "Chipre"
                },
                {
                 "value": "Czech Republic",
                 "text": "República Tcheca"
                },
                {
                 "value": "Denmark",
                 "text": "Dinamarca"
                },
                {
                 "value": "Djibouti",
                 "text": "Djibouti"
                },
                {
                 "value": "Dominica",
                 "text": "Dominica"
                },
                {
                 "value": "Dominican Republic",
                 "text": "República Dominicana"
                },
                {
                 "value": "Ecuador",
                 "text": "Equador"
                },
                {
                 "value": "Egypt",
                 "text": "Egito"
                },
                {
                 "value": "El Salvador",
                 "text": "El Salvador"
                },
                {
                 "value": "Equatorial Guinea",
                 "text": "Guiné Equatorial"
                },
                {
                 "value": "Eritrea",
                 "text": "Eritreia"
                },
                {
                 "value": "Estonia",
                 "text": "Estônia"
                },
                {
                 "value": "Ethiopia",
                 "text": "Etiópia"
                },
                {
                 "value": "Falkland Islands (Malvinas)",
                 "text": "Ilhas Malvinas"
                },
                {
                 "value": "Faroe Islands",
                 "text": "Ilhas Faroe"
                },
                {
                 "value": "Fiji",
                 "text": "Fiji"
                },
                {
                 "value": "Finland",
                 "text": "Finlândia"
                },
                {
                 "value": "France",
                 "text": "França"
                },
                {
                 "value": "French Guiana",
                 "text": "Guiana Francesa"
                },
                {
                 "value": "French Polynesia",
                 "text": "Polinésia Francesa"
                },
                {
                 "value": "French Southern Territories",
                 "text": "Territórios Franceses do Sul"
                },
                {
                 "value": "Gabon",
                 "text": "Gabão"
                },
                {
                 "value": "Gambia",
                 "text": "Gâmbia"
                },
                {
                 "value": "Georgia",
                 "text": "Geórgia"
                },
                {
                 "value": "Germany",
                 "text": "Alemanha"
                },
                {
                 "value": "Ghana",
                 "text": "Gana"
                },
                {
                 "value": "Gibraltar",
                 "text": "Gibraltar"
                },
                {
                 "value": "Greece",
                 "text": "Grécia"
                },
                {
                 "value": "Greenland",
                 "text": "Groelândia"
                },
                {
                 "value": "Grenada",
                 "text": "Granada"
                },
                {
                 "value": "Guadeloupe",
                 "text": "Guadalupe"
                },
                {
                 "value": "Guam",
                 "text": "Guam"
                },
                {
                 "value": "Guatemala",
                 "text": "Guatemala"
                },
                {
                 "value": "Guernsey",
                 "text": "Guernsey"
                },
                {
                 "value": "Guinea",
                 "text": "Guiné"
                },
                {
                 "value": "Guinea-Bissau",
                 "text": "Guiné-Bissau"
                },
                {
                 "value": "Guyana",
                 "text": "Guiana"
                },
                {
                 "value": "Haiti",
                 "text": "Haiti"
                },
                {
                 "value": "Heard Island and McDonald Islands",
                 "text": "Ilha Heard e Ilhas McDonald"
                },
                {
                 "value": "Holy See (Vatican City State)",
                 "text": "Santa Sé (Estado da Cidade do Vaticano)"
                },
                {
                 "value": "Honduras",
                 "text": "Honduras"
                },
                {
                 "value": "Hong Kong S.A.R., China",
                 "text": "Hong Kong S.A.R., China"
                },
                {
                 "value": "Hungary",
                 "text": "Hungria"
                },
                {
                 "value": "Iceland",
                 "text": "Islândia"
                },
                {
                 "value": "India",
                 "text": "Índia"
                },
                {
                 "value": "Indonesia",
                 "text": "Indonésia"
                },
                {
                 "value": "Iran, Islamic Republic of",
                 "text": "Irã, República Islâmica do"
                },
                {
                 "value": "Iraq",
                 "text": "Iraque"
                },
                {
                 "value": "Ireland",
                 "text": "Irlanda"
                },
                {
                 "value": "Isle of Man",
                 "text": "Ilha de Man"
                },
                {
                 "value": "Israel",
                 "text": "Israel"
                },
                {
                 "value": "Italy",
                 "text": "Itália"
                },
                {
                 "value": "Jamaica",
                 "text": "Jamaica"
                },
                {
                 "value": "Japan",
                 "text": "Japão"
                },
                {
                 "value": "Jersey",
                 "text": "Jersey"
                },
                {
                 "value": "Jordan",
                 "text": "Jordânia"
                },
                {
                 "value": "Kazakhstan",
                 "text": "Cazaquistão"
                },
                {
                 "value": "Kenya",
                 "text": "Quênia"
                },
                {
                 "value": "Kiribati",
                 "text": "Kiribati"
                },
                {
                 "value": "Korea, Democratic People's Republic of",
                 "text": "Coreia, República Popular Democrática da"
                },
                {
                 "value": "Korea, Republic of",
                 "text": "Coreia, República da"
                },
                {
                 "value": "Kuwait",
                 "text": "Kuwait"
                },
                {
                 "value": "Kyrgyzstan",
                 "text": "Quirguizistão"
                },
                {
                 "value": "Lao People's Democratic Republic",
                 "text": "República Democrática Popular do Laos"
                },
                {
                 "value": "Latvia",
                 "text": "Letônia"
                },
                {
                 "value": "Lebanon",
                 "text": "Líbano"
                },
                {
                 "value": "Lesotho",
                 "text": "Lesoto"
                },
                {
                 "value": "Liberia",
                 "text": "Libéria"
                },
                {
                 "value": "Libyan Arab Jamahiriya",
                 "text": "Jamahiriya Árabe Líbia"
                },
                {
                 "value": "Liechtenstein",
                 "text": "Liechtenstein"
                },
                {
                 "value": "Lithuania",
                 "text": "Lituânia"
                },
                {
                 "value": "Luxembourg",
                 "text": "Luxemburgo"
                },
                {
                 "value": "Macao S.A.R., China",
                 "text": "Macau S.A.R., China"
                },
                {
                 "value": "Macedonia, the former Yugoslav Republic of",
                 "text": "Macedônia, a antiga República Iugoslava da"
                },
                {
                 "value": "Madagascar",
                 "text": "Madagascar"
                },
                {
                 "value": "Malawi",
                 "text": "Malauí"
                },
                {
                 "value": "Malaysia",
                 "text": "Malásia"
                },
                {
                 "value": "Maldives",
                 "text": "Maldivas"
                },
                {
                 "value": "Mali",
                 "text": "Mali"
                },
                {
                 "value": "Malta",
                 "text": "Malta"
                },
                {
                 "value": "Marshall Islands",
                 "text": "Ilhas Marshall"
                },
                {
                 "value": "Martinique",
                 "text": "Martinica"
                },
                {
                 "value": "Mauritania",
                 "text": "Mauritânia"
                },
                {
                 "value": "Mauritius",
                 "text": "Maurício"
                },
                {
                 "value": "Mayotte",
                 "text": "Mayotte"
                },
                {
                 "value": "Mexico",
                 "text": "México"
                },
                {
                 "value": "Micronesia, Federated States of",
                 "text": "Micronésia, Estados Federados de"
                },
                {
                 "value": "Moldova, Republic of",
                 "text": "Moldávia, República da"
                },
                {
                 "value": "Monaco",
                 "text": "Mônaco"
                },
                {
                 "value": "Mongolia",
                 "text": "Mongólia"
                },
                {
                 "value": "Montenegro",
                 "text": "Montenegro"
                },
                {
                 "value": "Montserrat",
                 "text": "Montserrat"
                },
                {
                 "value": "Morocco",
                 "text": "Marrocos"
                },
                {
                 "value": "Mozambique",
                 "text": "Moçambique"
                },
                {
                 "value": "Myanmar",
                 "text": "Mianmar"
                },
                {
                 "value": "N.Mariana Islnd",
                 "text": "Ilhas Marianas do Norte"
                },
                {
                 "value": "Namibia",
                 "text": "Namíbia"
                },
                {
                 "value": "Nauru",
                 "text": "Nauru"
                },
                {
                 "value": "Nepal",
                 "text": "Nepal"
                },
                {
                 "value": "Netherlands",
                 "text": "Países Baixos"
                },
                {
                 "value": "Netherlands Antilles",
                 "text": "Antilhas Holandesas"
                },
                {
                 "value": "New Caledonia",
                 "text": "Nova Caledônia"
                },
                {
                 "value": "New Zealand",
                 "text": "Nova Zelândia"
                },
                {
                 "value": "Nicaragua",
                 "text": "Nicarágua"
                },
                {
                 "value": "Niger",
                 "text": "Níger"
                },
                {
                 "value": "Nigeria",
                 "text": "Nigéria"
                },
                {
                 "value": "Niue",
                 "text": "Niue"
                },
                {
                 "value": "Norfolk Island",
                 "text": "Ilha Norfolk"
                },
                {
                 "value": "North Korea",
                 "text": "Coréia do Norte"
                },
                {
                 "value": "Norway",
                 "text": "Noruega"
                },
                {
                 "value": "Oman",
                 "text": "Omã"
                },
                {
                 "value": "Pakistan",
                 "text": "Paquistão"
                },
                {
                 "value": "Palau",
                 "text": "Palau"
                },
                {
                 "value": "Palestinian Territory, Occupied",
                 "text": "Território Palestino, Ocupado"
                },
                {
                 "value": "Panama",
                 "text": "Panamá"
                },
                {
                 "value": "Papua New Guinea",
                 "text": "Papua Nova Guiné"
                },
                {
                 "value": "Paraguay",
                 "text": "Paraguai"
                },
                {
                 "value": "Peru",
                 "text": "Peru"
                },
                {
                 "value": "Philippines",
                 "text": "Filipinas"
                },
                {
                 "value": "Pitcairn",
                 "text": "Pitcairn"
                },
                {
                 "value": "Poland",
                 "text": "Polônia"
                },
                {
                 "value": "Portugal",
                 "text": "Portugal"
                },
                {
                 "value": "Puerto Rico",
                 "text": "Porto Rico"
                },
                {
                 "value": "Qatar",
                 "text": "Qatar"
                },
                {
                 "value": "Reunion",
                 "text": "Reunião"
                },
                {
                 "value": "Romania",
                 "text": "Romênia"
                },
                {
                 "value": "Russian Federation",
                 "text": "Federação Russa"
                },
                {
                 "value": "Rwanda",
                 "text": "Ruanda"
                },
                {
                 "value": "Saint Barthélemy",
                 "text": "São Bartolomeu"
                },
                {
                 "value": "Saint Helena, Ascension and Tristan da Cunha",
                 "text": "Santa Helena, Ascensão e Tristão da Cunha"
                },
                {
                 "value": "Saint Kitts and Nevis",
                 "text": "São Cristóvão e Névis"
                },
                {
                 "value": "Saint Lucia",
                 "text": "Santa Lúcia"
                },
                {
                 "value": "Saint Martin (French part)",
                 "text": "Saint Martin (parte francesa)"
                },
                {
                 "value": "Saint Pierre and Miquelon",
                 "text": "São Pedro e Miquelon"
                },
                {
                 "value": "Saint Vincent and the Grenadines",
                 "text": "São Vicente e as Granadinas"
                },
                {
                 "value": "Samoa",
                 "text": "Samoa"
                },
                {
                 "value": "Samoa, American",
                 "text": "Samoa, americano"
                },
                {
                 "value": "San Marino",
                 "text": "São Marino"
                },
                {
                 "value": "Sao Tome and Principe",
                 "text": "São Tomé e Príncipe"
                },
                {
                 "value": "Saudi Arabia",
                 "text": "Arábia Saudita"
                },
                {
                 "value": "Senegal",
                 "text": "Senegal"
                },
                {
                 "value": "Serbia",
                 "text": "Sérvia"
                },
                {
                 "value": "Seychelles",
                 "text": "Seychelles"
                },
                {
                 "value": "Sierra Leone",
                 "text": "Serra Leoa"
                },
                {
                 "value": "Singapore",
                 "text": "Cingapura"
                },
                {
                 "value": "Sint Maarten (Dutch part)",
                 "text": "Sint Maarten (parte holandesa)"
                },
                {
                 "value": "Slovakia",
                 "text": "Eslováquia"
                },
                {
                 "value": "Slovenia",
                 "text": "Eslovênia"
                },
                {
                 "value": "Solomon Islands",
                 "text": "Ilhas Salomão"
                },
                {
                 "value": "Somalia",
                 "text": "Somália"
                },
                {
                 "value": "South Africa",
                 "text": "África do Sul"
                },
                {
                 "value": "South Georgia and the South Sandwich Islands",
                 "text": "Ilhas Geórgia do Sul e Sandwich do Sul"
                },
                {
                 "value": "South Sudan",
                 "text": "Sul do Sudão"
                },
                {
                 "value": "Spain",
                 "text": "Espanha"
                },
                {
                 "value": "Sri Lanka",
                 "text": "Sri Lanka"
                },
                {
                 "value": "Sudan",
                 "text": "Sudão"
                },
                {
                 "value": "Suriname",
                 "text": "Suriname"
                },
                {
                 "value": "Svalbard and Jan Mayen",
                 "text": "Svalbard e Jan Mayen"
                },
                {
                 "value": "Swaziland",
                 "text": "Suazilândia"
                },
                {
                 "value": "Sweden",
                 "text": "Suécia"
                },
                {
                 "value": "Switzerland",
                 "text": "Suíça"
                },
                {
                 "value": "Syrian Arab Republic",
                 "text": "República Árabe da Síria"
                },
                {
                 "value": "Taiwan",
                 "text": "Taiwan"
                },
                {
                 "value": "Tajikistan",
                 "text": "Tajiquistão"
                },
                {
                 "value": "Tanzania, United Republic of",
                 "text": "Tanzânia, República Unida da"
                },
                {
                 "value": "Thailand",
                 "text": "Tailândia"
                },
                {
                 "value": "Timor-Leste",
                 "text": "Timor-Leste"
                },
                {
                 "value": "Togo",
                 "text": "Togo"
                },
                {
                 "value": "Tokelau",
                 "text": "Tokelau"
                },
                {
                 "value": "Tonga",
                 "text": "Tonga"
                },
                {
                 "value": "Trinidad and Tobago",
                 "text": "Trinidad e Tobago"
                },
                {
                 "value": "Tunisia",
                 "text": "Tunísia"
                },
                {
                 "value": "Turkey",
                 "text": "Turquia"
                },
                {
                 "value": "Turkmenistan",
                 "text": "Turcomenistão"
                },
                {
                 "value": "Turks and Caicos Islands",
                 "text": "Ilhas Turcas e Caicos"
                },
                {
                 "value": "Tuvalu",
                 "text": "Tuvalu"
                },
                {
                 "value": "Uganda",
                 "text": "Uganda"
                },
                {
                 "value": "Ukraine",
                 "text": "Ucrânia"
                },
                {
                 "value": "United Arab Emirates",
                 "text": "Emirados Árabes Unidos"
                },
                {
                 "value": "United Kingdom",
                 "text": "Reino Unido"
                },
                {
                 "value": "United States",
                 "text": "Estados Unidos"
                },
                {
                 "value": "Uruguay",
                 "text": "Uruguai"
                },
                {
                 "value": "US Minor Outl.Isl.",
                 "text": "Ilhas Menores Distantes dos Estados Unidos"
                },
                {
                 "value": "Uzbekistan",
                 "text": "Uzbequistão"
                },
                {
                 "value": "Vanuatu",
                 "text": "Vanuatu"
                },
                {
                 "value": "Venezuela, Bolivarian Republic of",
                 "text": "Venezuela, República Bolivariana da"
                },
                {
                 "value": "Vietnam",
                 "text": "Vietnã"
                },
                {
                 "value": "Virgin Islands, British",
                 "text": "Ilhas Virgens, Reino Unido"
                },
                {
                 "value": "Virgin Islands, US",
                 "text": "Ilhas Virgens, EUA"
                },
                {
                 "value": "Wallis and Futuna",
                 "text": "Wallis e Futuna"
                },
                {
                 "value": "Western Sahara",
                 "text": "Saara Ocidental"
                },
                {
                 "value": "Yemen",
                 "text": "Iêmen"
                },
                {
                 "value": "Zambia",
                 "text": "Zâmbia"
                },
                {
                 "value": "Zimbabwe",
                 "text": "Zimbábue"
                }
               ]
            ,
            "requiredError": "Selecione um valor para este campo",
        },
        "State": {
            "type": "select",
            "label": "Estado *",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "AL",
                 "text": "Alabama"
                },
                {
                 "value": "AK",
                 "text": "Alasca"
                },
                {
                 "value": "AZ",
                 "text": "Arizona"
                },
                {
                 "value": "AR",
                 "text": "Arkansas"
                },
                {
                 "value": "CA",
                 "text": "Califórnia"
                },
                {
                 "value": "CO",
                 "text": "Colorado"
                },
                {
                 "value": "CT",
                 "text": "Connecticut"
                },
                {
                 "value": "DE",
                 "text": "Delaware"
                },
                {
                 "value": "FL",
                 "text": "Flórida"
                },
                {
                 "value": "GA",
                 "text": "Geórgia"
                },
                {
                 "value": "HI",
                 "text": "Havaí"
                },
                {
                 "value": "ID",
                 "text": "Idaho"
                },
                {
                 "value": "IL",
                 "text": "Illinois"
                },
                {
                 "value": "IN",
                 "text": "Indiana"
                },
                {
                 "value": "IA",
                 "text": "Iowa"
                },
                {
                 "value": "KS",
                 "text": "Kansas"
                },
                {
                 "value": "KY",
                 "text": "Kentucky"
                },
                {
                 "value": "LA",
                 "text": "Louisiana"
                },
                {
                 "value": "ME",
                 "text": "Maine"
                },
                {
                 "value": "MD",
                 "text": "Maryland"
                },
                {
                 "value": "MA",
                 "text": "Massachusetts"
                },
                {
                 "value": "MI",
                 "text": "Michigan"
                },
                {
                 "value": "MN",
                 "text": "Minnesota"
                },
                {
                 "value": "MS",
                 "text": "Mississippi"
                },
                {
                 "value": "MO",
                 "text": "Missouri"
                },
                {
                 "value": "MT",
                 "text": "Montana"
                },
                {
                 "value": "NE",
                 "text": "Nebraska"
                },
                {
                 "value": "NV",
                 "text": "Nevada"
                },
                {
                 "value": "NH",
                 "text": "New Hampshire"
                },
                {
                 "value": "NJ",
                 "text": "Nova Jérsei"
                },
                {
                 "value": "NM",
                 "text": "Novo México"
                },
                {
                 "value": "NY",
                 "text": "Nova Iorque"
                },
                {
                 "value": "NC",
                 "text": "Carolina do Norte"
                },
                {
                 "value": "ND",
                 "text": "Dakota do Norte"
                },
                {
                 "value": "OH",
                 "text": "Ohio"
                },
                {
                 "value": "OK",
                 "text": "Oklahoma"
                },
                {
                 "value": "OR",
                 "text": "Oregon"
                },
                {
                 "value": "PA",
                 "text": "Pensilvânia"
                },
                {
                 "value": "RI",
                 "text": "Rhode Island"
                },
                {
                 "value": "SC",
                 "text": "Carolina do Sul"
                },
                {
                 "value": "SD",
                 "text": "Dakota do Sul"
                },
                {
                 "value": "TN",
                 "text": "Tennessee"
                },
                {
                 "value": "TX",
                 "text": "Texas"
                },
                {
                 "value": "UT",
                 "text": "Utah"
                },
                {
                 "value": "VT",
                 "text": "Vermont"
                },
                {
                 "value": "VA",
                 "text": "Virgínia"
                },
                {
                 "value": "WA",
                 "text": "Washington"
                },
                {
                 "value": "WV",
                 "text": "Virgínia Ocidental"
                },
                {
                 "value": "WI",
                 "text": "Wisconsin"
                },
                {
                 "value": "WY",
                 "text": "Wyoming"
                }
               ],
            "requiredError": "Selecione um valor para este campo",
        },
        "JobFunction__c": {
            "type": "select",
            "label": "Cargo",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Accountant/Controller",
                 "text": "Contador/controlador"
                },
                {
                 "value": "Account Manager",
                 "text": "Gerente de contas"
                },
                {
                 "value": "Assistant",
                 "text": "Assistente"
                },
                {
                 "value": "Branch Manager",
                 "text": "Gerente de filial"
                },
                {
                 "value": "Chairman",
                 "text": "Presidente"
                },
                {
                 "value": "Chief Compliance Officer",
                 "text": "Diretor Executivo de Conformidade"
                },
                {
                 "value": "Chief Digital Officer",
                 "text": "Diretor Digital"
                },
                {
                 "value": "Chief Executive Officer",
                 "text": "Diretor Executivo Principal"
                },
                {
                 "value": "Chief Financial Officer",
                 "text": "Diretor Financeiro"
                },
                {
                 "value": "Chief Information Officer",
                 "text": "Diretor de Informação"
                },
                {
                 "value": "Chief Marketing Officer",
                 "text": "Diretor de Marketing"
                },
                {
                 "value": "Chief Medical Officer",
                 "text": "Diretor Médico Chefe"
                },
                {
                 "value": "Chief Operations Officer",
                 "text": "Chefe de Operações"
                },
                {
                 "value": "Chief Procurement Officer",
                 "text": "Chefe de Compras"
                },
                {
                 "value": "Chief Risk Officer",
                 "text": "Diretor de Risco"
                },
                {
                 "value": "Chief Security Officer",
                 "text": "Chefe de Segurança"
                },
                {
                 "value": "Chief Technology Officer",
                 "text": "Chefe de Tecnologia"
                },
                {
                 "value": "Commercial Director",
                 "text": "Diretor Comercial"
                },
                {
                 "value": "Consultant",
                 "text": "Consultor"
                },
                {
                 "value": "Customer Experience",
                 "text": "Experiência do usuário"
                },
                {
                 "value": "Customer Service",
                 "text": "Atendimento ao cliente"
                },
                {
                 "value": "Digital Transformation",
                 "text": "Transformação digital"
                },
                {
                 "value": "Director- General",
                 "text": "Diretor Geral"
                },
                {
                 "value": "Director - Other",
                 "text": "Diretor - Outros"
                },
                {
                 "value": "Director others",
                 "text": "Diretor outros"
                },
                {
                 "value": "Distribution Director",
                 "text": "Diretor de Distribuição"
                },
                {
                 "value": "Financial Director",
                 "text": "Diretor financeiro"
                },
                {
                 "value": "HR Director",
                 "text": "Diretor de RH"
                },
                {
                 "value": "HR Manager",
                 "text": "Gerente de RH"
                },
                {
                 "value": "IT Application Mangement",
                 "text": "Gestão de aplicação de TI"
                },
                {
                 "value": "IT Consulting",
                 "text": "Consultoria de TI"
                },
                {
                 "value": "IT Director",
                 "text": "Diretor de TI"
                },
                {
                 "value": "IT Manager",
                 "text": "Gerente de TI"
                },
                {
                 "value": "IT Operations",
                 "text": "Operações de TI"
                },
                {
                 "value": "IT Strategy",
                 "text": "Estratégia de TI"
                },
                {
                 "value": "IT System Integration",
                 "text": "Integração de sistema de TI"
                },
                {
                 "value": "Management others",
                 "text": "Ouras gestões"
                },
                {
                 "value": "Managing Director",
                 "text": "Diretor geral"
                },
                {
                 "value": "Managing Partner",
                 "text": "Sócio Gerente"
                },
                {
                 "value": "MarCom Manager",
                 "text": "Gerente MarCom"
                },
                {
                 "value": "Marketing Director",
                 "text": "Diretor de Marketing"
                },
                {
                 "value": "Member of Board of Directors",
                 "text": "Membro do Conselho de Administração"
                },
                {
                 "value": "Member of Supervisory Board",
                 "text": "Membro da Comissão de Supervisão"
                },
                {
                 "value": "Minister",
                 "text": "Ministro"
                },
                {
                 "value": "Minister of State",
                 "text": "Ministro de Estado"
                },
                {
                 "value": "Nursing",
                 "text": "Enfermagem"
                },
                {
                 "value": "Operations Director",
                 "text": "Diretor de Operações"
                },
                {
                 "value": "Other",
                 "text": "Outros"
                },
                {
                 "value": "PA/Assistant",
                 "text": "PA/Assistente"
                },
                {
                 "value": "President Board of Directors",
                 "text": "Presidente do Conselho de Administração"
                },
                {
                 "value": "President Supervisory Board",
                 "text": "Presidente do Conselho Supervisor"
                },
                {
                 "value": "Press",
                 "text": "Imprensa"
                },
                {
                 "value": "Procurement",
                 "text": "Compras"
                },
                {
                 "value": "Public Rel. Manager",
                 "text": "Relações Públicas Gerente"
                },
                {
                 "value": "Public Relations Manager",
                 "text": "Gerente de Relações Públicas"
                },
                {
                 "value": "Sales Director",
                 "text": "Diretor de Vendas"
                },
                {
                 "value": "Sales Manager",
                 "text": "Gerente de Vendas"
                },
                {
                 "value": "Secretary",
                 "text": "Secretário"
                },
                {
                 "value": "State Secretary",
                 "text": "Secretário de Estado"
                },
                {
                 "value": "Supervisor",
                 "text": "Supervisor"
                },
                {
                 "value": "Vice-Chairman",
                 "text": "Vice-presidente"
                },
                {
                 "value": "Vice Pres. Board of Directors",
                 "text": "Vice-Presidente do Conselho de Administração"
                },
                {
                 "value": "Vice Pres. Supervisory Board",
                 "text": "Vice-Presidente do Conselho Supervisor"
                }
               ]
        },
        "SF_Job_Title__c" : {
            "type": "text",
            "label": "Cargo",
        },
        "interestedIn" : {
            "type": "select",
            "label": "Produto *",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "IAM solution",
                 "text": "Solução de gestão de identidades e acessos (IAM)"
                },
                {
                 "value": "SSO Single Sign-on",
                 "text": "Login único (SSO)"
                },
                {
                 "value": "Strong Authentication Management",
                 "text": "Gestão de autenticação forte"
                },
                {
                 "value": "Identity Governance and Administration",
                 "text": "Governança e administração de identidades"
                },
                {
                 "value": "Web Access Manager",
                 "text": "Gestão de acesso web"
                },
                {
                 "value": "Identity As-a-Service",
                 "text": "Orbion (identidade como serviço)"
                },
                {
                 "value": "High Availability",
                 "text": "Alta disponibilidade (SafeKit)"
                },
                {
                 "value": "Identity Analytics Intelligence",
                 "text": "Análise inteligente de identidades"
                },
                {
                 "value": "DirX",
                 "text": "DirX"
                },
                {
                 "value": "Other",
                 "text": "Outros"
                }
               ],
            "requiredError": "Selecione um valor para este campo",
        },
        "enquiryType" : {
            "type": "select",
            "label": "Tipo de consulta *",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Product Information",
                 "text": "Em formação"
                },
                {
                 "value": "Price Quote",
                 "text": "Preço"
                },
                {
                 "value": "Demo",
                 "text": "Demonstração"
                },
                {
                 "value": "Free trial package",
                 "text": "Teste"
                },
                {
                 "value": "Free trial license",
                 "text": "POC"
                },
                {
                 "value": "Training & Certification",
                 "text": "Treinamento e Certificação"
                },
                {
                 "value": "New Solution or Services for Your Business",
                 "text": "Nova solução ou serviços para sua empresa"
                },
                {
                 "value": "Product/Customer Support (current Eviden clients only)",
                 "text": "Suporte ao produto/cliente (somente clientes atuais da Eviden)"
                },
                {
                 "value": "Accounting, Billing or Payments",
                 "text": "Contabilidade, faturamento ou pagamentos"
                },
                {
                 "value": "Job Information",
                 "text": "Informações sobre o emprego"
                },
                {
                 "value": "Press Inquiry",
                 "text": "Consulta de Imprensa"
                },
                {
                 "value": "Selling to Eviden",
                 "text": "Venda para a Eviden"
                },
                {
                 "value": "Alliance/Partnership Matters",
                 "text": "Assuntos de Aliança/Parceria"
                },
                {
                 "value": "Other",
                 "text": "Outros"
                }
               ],
            "requiredError": "Selecione um valor para este campo",
        },
        "enquiry" : {
            "type": "text",
            "label": "Consulta",
        },
        "Purchase_Authority__c" : {
            "type": "select",
            "label": "Autoridade de compra",
            "options": [
                {
                    "value": "", 
                    "text": "Selecione"
                },
                {
                    "value": "Yes", 
                    "text": "Sim"
                },
                {
                    "value": "No", 
                    "text": "Não"
                },
            ],
        },
        "Purchase_Timeline__c" : {
            "type": "select",
            "label": "Linha do tempo de compra",
            "options": [
                {
                 "value": "",
                 "text": "Selecione"
                },
                {
                 "value": "Less than 3 months",
                 "text": "Menos de 3 meses"
                },
                {
                 "value": "3 to 6 Months",
                 "text": "3 a 6 meses"
                },
                {
                 "value": "6 to 12 months",
                 "text": "6 a 12 meses"
                },
                {
                 "value": "Over 12 months",
                 "text": "Mais de 12 meses"
                }
               ],
        },
        "Opt_in__c" : {
            "type": "radio",
            "label": "Consentimento para receber comunicações *",
            "options": [
                {
                    "value": "yes", 
                    "text": "Sim"
                },
                {
                    "value": "no", 
                    "text": "Não"
                }
            ],
            "requiredError": "Selecione um valor para este campo",
        },
        "PrivacyText" : [
            {
             "value": "GDPR",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através da GDPR. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "DPA",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através da DPA. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "CCPA",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através do CCPA/CPRA. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "CASL",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através da CASL. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "LGDP",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através da LGPD. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "POPIA",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através do POPIA. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "LFPDPPP",
             "text": "Sua privacidade é importante para nós. Seu país lhe fornece direitos através do LFPDPPP. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos e como remover seus dados, se desejar."
            },
            {
             "value": "none",
             "text": "Sua privacidade é importante para nós. Ao enviar este formulário, você aceita os termos de nossa Política de Privacidade. Leia-a para entender como garantimos que seus direitos sejam mantidos."
            }
           ],
        "OptInText" : [
            {
                "value": "GDPRandDefault",
                "text": "*Para garantir receber comunicações relevantes da Eviden relacionadas a nossos eventos e ofertas, favor optar por participar. É possível optar por não participar a qualquer momento."
            },
            {
                "value": "CCPA",
                "text": "Ao fornecer suas informações neste formulário, você consente em receber comunicações da Eviden relacionadas a nossos eventos e ofertas, de acordo com nossa Política de Privacidade. É possível optar por não participar a qualquer momento."
            },
        ],
        "Submit" : {
            "type" : "submit",
            "text" : "Enviar"
        },
        "ThankYouEmptyDataContent" : "Obrigado por seu interesse.",
        "ThankYouDataContent" : "Obrigado por seu interesse em",
        "DownloadLinkText" : "Você pode baixar o relatório aqui.",
        "ContactTYText" : "Um membro de nossa equipe entrará em contato com você em breve"
   },
    
};

    languageTranslations["Spanish"] = languageTranslations["European Spanish"];

const additionalFormLanguages = {
    "AR": {
        "labels": {
            "Salutation": "اللقب", "FirstName": "الاسم الأول *", "LastName": "اسم العائلة *",
            "Email": "البريد الإلكتروني للعمل *", "customerIndustry": "القطاع *", "Phone": "هاتف العمل *",
            "Company": "اسم الشركة أو المؤسسة *", "Company_Revenue__c": "إيرادات الشركة",
            "Company_Size__c": "حجم الشركة", "Country": "البلد أو المنطقة *", "State": "الولاية *",
            "JobFunction__c": "المجال الوظيفي", "SF_Job_Title__c": "المسمى الوظيفي",
            "interestedIn": "المنتج *", "enquiryType": "نوع الاستفسار *", "enquiry": "الاستفسار",
            "Purchase_Authority__c": "صلاحية الشراء", "Purchase_Timeline__c": "الإطار الزمني للشراء",
            "Opt_in__c": "الموافقة على تلقي الرسائل *"
        },
        "required": "هذا الحقل مطلوب", "selectRequired": "يرجى اختيار قيمة لهذا الحقل",
        "emailRequired": "يرجى إدخال عنوان بريد إلكتروني صالح", "phoneRequired": "يرجى إدخال رقم هاتف صالح",
        "options": {
            "Salutation": ["السيد", "السيدة المتزوجة", "السيدة", "الآنسة", "لقب محايد", "السيد الصغير", "السير", "الدكتور"],
            "interestedIn": ["حل إدارة الهوية والوصول (IAM)", "تسجيل الدخول الموحد (SSO)", "إدارة المصادقة القوية", "حوكمة الهويات وإدارتها", "إدارة الوصول إلى الويب", "Orbion (الهوية كخدمة)", "التوافر العالي (SafeKit)", "التحليل الذكي للهويات", "DirX", "أخرى"],
            "enquiryType": ["معلومات المنتج", "عرض سعر", "عرض توضيحي", "تجربة مجانية", "إثبات المفهوم (POC)", "التدريب والشهادات", "حلول أو خدمات جديدة لشركتك", "دعم المنتجات والعملاء (لعملاء Eviden الحاليين فقط)", "المحاسبة أو الفوترة أو المدفوعات", "معلومات الوظائف", "استفسار صحفي", "توريد منتجات أو خدمات إلى Eviden", "شؤون التحالفات والشراكات", "أخرى"],
            "Company_Revenue__c": ["أقل من 200 مليون دولار", "من 201 إلى 500 مليون دولار", "من 501 مليون إلى مليار دولار", "أكثر من مليار دولار"],
            "Company_Size__c": ["أقل من 3,000 موظف", "من 3,001 إلى 5,000 موظف", "من 5,001 إلى 10,000 موظف", "أكثر من 10,001 موظف"],
            "Purchase_Authority__c": ["نعم", "لا"],
            "Purchase_Timeline__c": ["أقل من 3 أشهر", "من 3 إلى 6 أشهر", "من 6 إلى 12 شهرًا", "أكثر من 12 شهرًا"],
            "Opt_in__c": ["نعم", "لا"],
            "State": [
                "ألاباما", "ألاسكا", "أريزونا", "أركنساس", "كاليفورنيا", "كولورادو", "كونيتيكت", "ديلاوير", "فلوريدا", "جورجيا",
                "هاواي", "أيداهو", "إلينوي", "إنديانا", "آيوا", "كانساس", "كنتاكي", "لويزيانا", "مين", "ماريلاند",
                "ماساتشوستس", "ميشيغان", "مينيسوتا", "ميسيسيبي", "ميزوري", "مونتانا", "نبراسكا", "نيفادا", "نيوهامبشير", "نيوجيرسي",
                "نيومكسيكو", "نيويورك", "كارولاينا الشمالية", "داكوتا الشمالية", "أوهايو", "أوكلاهوما", "أوريغون", "بنسلفانيا", "رود آيلاند", "كارولاينا الجنوبية",
                "داكوتا الجنوبية", "تينيسي", "تكساس", "يوتا", "فيرمونت", "فرجينيا", "واشنطن", "فرجينيا الغربية", "ويسكونسن", "وايومنغ"
            ],
            "JobFunction__c": [
                "محاسب أو مراقب مالي", "مدير حسابات", "مساعد", "مدير فرع", "رئيس مجلس الإدارة", "الرئيس التنفيذي للامتثال", "الرئيس التنفيذي للتحول الرقمي", "الرئيس التنفيذي", "الرئيس التنفيذي للشؤون المالية", "الرئيس التنفيذي للمعلومات",
                "الرئيس التنفيذي للتسويق", "الرئيس التنفيذي للشؤون الطبية", "الرئيس التنفيذي للعمليات", "الرئيس التنفيذي للمشتريات", "الرئيس التنفيذي للمخاطر", "الرئيس التنفيذي للأمن", "الرئيس التنفيذي للتقنية", "المدير التجاري", "مستشار", "تجربة العملاء",
                "خدمة العملاء", "التحول الرقمي", "المدير العام", "مدير في مجال آخر", "مديرون آخرون", "مدير التوزيع", "المدير المالي", "مدير إدارة الموارد البشرية", "مدير الموارد البشرية", "إدارة تطبيقات تقنية المعلومات",
                "استشارات تقنية المعلومات", "مدير إدارة تقنية المعلومات", "مدير تقنية المعلومات", "عمليات تقنية المعلومات", "استراتيجية تقنية المعلومات", "تكامل أنظمة تقنية المعلومات", "مناصب إدارية أخرى", "المدير المنتدب", "الشريك المدير", "مدير الاتصالات التسويقية",
                "مدير التسويق", "عضو مجلس الإدارة", "عضو مجلس الرقابة", "وزير", "وزير دولة", "التمريض", "مدير العمليات", "أخرى", "مساعد شخصي", "رئيس مجلس الإدارة",
                "رئيس مجلس الرقابة", "الصحافة", "المشتريات", "مدير العلاقات العامة", "مدير العلاقات العامة", "مدير إدارة المبيعات", "مدير المبيعات", "سكرتير", "أمين دولة", "مشرف",
                "نائب الرئيس", "نائب رئيس مجلس الإدارة", "نائب رئيس مجلس الرقابة"
            ],
            "customerIndustry": [
                "المحاسبة", "شركات الطيران", "الوسائل البديلة لتسوية النزاعات", "الطب البديل", "الرسوم المتحركة", "الملابس والأزياء", "الهندسة المعمارية والتخطيط", "الفنون والحرف", "صناعة السيارات", "الطيران والفضاء",
                "الخدمات المصرفية", "التقنية الحيوية", "الإعلام الإذاعي والتلفزيوني", "مواد البناء", "مستلزمات ومعدات الأعمال", "أسواق رأس المال", "الصناعات الكيميائية", "المنظمات المدنية والاجتماعية", "الهندسة المدنية", "العقارات التجارية",
                "أمن الحاسوب والشبكات", "ألعاب الحاسوب", "أجهزة الحاسوب", "شبكات الحاسوب", "برمجيات الحاسوب", "البناء والتشييد", "الإلكترونيات الاستهلاكية", "السلع الاستهلاكية", "خدمات المستهلكين", "مستحضرات التجميل",
                "منتجات الألبان", "الدفاع والفضاء", "التصميم", "إدارة التعليم", "التعلم الإلكتروني", "تصنيع المعدات الكهربائية والإلكترونية", "الترفيه", "الخدمات البيئية", "خدمات الفعاليات", "الإدارة التنفيذية",
                "خدمات المرافق", "الزراعة", "الخدمات المالية", "الفنون الجميلة", "صيد الأسماك", "الأغذية والمشروبات", "إنتاج الأغذية", "جمع التبرعات", "الأثاث", "المراهنات والكازينوهات",
                "الزجاج والسيراميك والخرسانة", "الإدارة الحكومية", "العلاقات الحكومية", "التصميم الجرافيكي", "الصحة والعافية واللياقة البدنية", "التعليم العالي", "المستشفيات والرعاية الصحية", "الضيافة", "الموارد البشرية", "الاستيراد والتصدير",
                "خدمات الأفراد والأسر", "الأتمتة الصناعية", "خدمات المعلومات", "تقنية المعلومات والخدمات", "التأمين", "الشؤون الدولية", "التجارة الدولية والتنمية", "الإنترنت", "الخدمات المصرفية الاستثمارية", "إدارة الاستثمارات",
                "القضاء", "إنفاذ القانون", "المحاماة", "الخدمات القانونية", "المؤسسات التشريعية", "الترفيه والسفر والسياحة", "المكتبات", "الخدمات اللوجستية وسلاسل الإمداد", "السلع الفاخرة والمجوهرات", "الآلات",
                "الاستشارات الإدارية", "النقل البحري", "أبحاث السوق", "التسويق والإعلان", "الهندسة الميكانيكية أو الصناعية", "الإنتاج الإعلامي", "الأجهزة الطبية", "ممارسة الطب", "الرعاية الصحية النفسية", "المؤسسات العسكرية",
                "التعدين والمعادن", "ألعاب الهواتف المحمولة", "السينما والأفلام", "المتاحف والمؤسسات", "الموسيقى", "تقنية النانو", "الصحف", "إدارة المنظمات غير الربحية", "النفط والطاقة", "الإعلام الإلكتروني",
                "أخرى", "الاستعانة بمصادر خارجية أو خارج البلاد", "توصيل الطرود والشحنات", "التغليف والحاويات", "الورق ومنتجات الغابات", "الفنون الأدائية", "الصناعات الدوائية", "الأعمال الخيرية", "التصوير الفوتوغرافي", "البلاستيك",
                "المنظمات السياسية", "التعليم الابتدائي والثانوي", "الطباعة", "التدريب والتوجيه المهني", "تطوير البرامج", "السياسات العامة", "العلاقات العامة والاتصالات", "السلامة العامة", "النشر", "تصنيع السكك الحديدية",
                "تربية الماشية", "العقارات", "المرافق والخدمات الترفيهية", "المؤسسات الدينية", "الطاقة المتجددة والبيئة", "البحث العلمي", "المطاعم", "تجارة التجزئة", "الأمن والتحقيقات", "أشباه الموصلات",
                "بناء السفن", "السلع الرياضية", "الرياضة", "التوظيف واستقطاب الكفاءات", "المتاجر الكبرى", "الاتصالات", "المنسوجات", "مراكز الفكر", "التبغ", "الترجمة والتوطين",
                "النقل والشاحنات والسكك الحديدية", "المرافق العامة", "رأس المال الاستثماري والأسهم الخاصة", "الطب البيطري", "التخزين", "تجارة الجملة", "النبيذ والمشروبات الروحية", "الاتصالات اللاسلكية", "الكتابة والتحرير"
            ]
        },
        "privacy": {
            "opening": "خصوصيتك مهمة لنا.",
            "law": "يمنحك بلدك حقوقًا بموجب {law}.",
            "acceptance": "بإرسال هذا النموذج، فإنك توافق على الشروط الواردة في <a href='https://eviden.com/privacy-policy/' target='_blank' rel='noopener noreferrer'>سياسة الخصوصية</a> الخاصة بنا.",
            "generic": "يرجى قراءتها لفهم كيف نضمن احترام حقوقك.",
            "regional": "يرجى قراءتها لفهم كيف نضمن احترام حقوقك وكيف يمكنك حذف بياناتك إذا رغبت في ذلك."
        },
        "optInTexts": [
            "*لضمان تلقي رسائل ذات صلة بفعاليات Eviden ومنتجاتها وخدماتها، يرجى الموافقة على الاشتراك. يمكنك إلغاء الاشتراك في أي وقت.",
            "بتقديم معلوماتك في هذا النموذج، فإنك توافق على تلقي رسائل من Eviden بشأن فعالياتها ومنتجاتها وخدماتها وفقًا لسياسة الخصوصية الخاصة بنا. يمكنك إلغاء الاشتراك في أي وقت."
        ],
        "select": "يرجى الاختيار", "submit": "إرسال",
        "thanks": "شكرًا لاهتمامك.", "thanksFor": "شكرًا لاهتمامك بـ",
        "download": "يمكنك تنزيل التقرير هنا.", "contact": "سيتواصل معك أحد أعضاء فريقنا قريبًا."
    },
    "PT-PT": {
        "labels": {
            "Salutation": "Tratamento", "FirstName": "Nome próprio *", "LastName": "Apelido *",
            "Email": "Endereço de correio eletrónico profissional *", "customerIndustry": "Setor de atividade *",
            "Phone": "Telefone profissional *", "Company": "Nome da empresa ou organização *",
            "Company_Revenue__c": "Volume de negócios da empresa", "Company_Size__c": "Dimensão da empresa",
            "Country": "País ou região *", "State": "Estado *", "JobFunction__c": "Função profissional",
            "SF_Job_Title__c": "Cargo", "interestedIn": "Produto *", "enquiryType": "Tipo de pedido *",
            "enquiry": "Pedido", "Purchase_Authority__c": "Autoridade de compra",
            "Purchase_Timeline__c": "Prazo de compra", "Opt_in__c": "Consentimento para receber comunicações *"
        },
        "required": "Este campo é obrigatório", "selectRequired": "Selecione uma opção neste campo",
        "emailRequired": "Introduza um endereço de correio eletrónico válido", "phoneRequired": "Introduza um número de telefone válido",
        "options": {
            "Salutation": ["Sr.", "Sra. (casada)", "Sra.", "Menina", "Mx.", "Menino", "Sir", "Dr./Dra."],
            "interestedIn": ["Solução de gestão de identidades e acessos (IAM)", "Autenticação única (SSO)", "Gestão de autenticação forte", "Governação e administração de identidades", "Gestão de acesso Web", "Orbion (identidade como serviço)", "Alta disponibilidade (SafeKit)", "Análise inteligente de identidades", "DirX", "Outro"],
            "enquiryType": ["Informações sobre o produto", "Pedido de orçamento", "Demonstração", "Avaliação gratuita", "Prova de conceito (POC)", "Formação e certificação", "Novas soluções ou serviços para a sua empresa", "Apoio ao produto ou ao cliente (apenas para clientes atuais da Eviden)", "Contabilidade, faturação ou pagamentos", "Informações sobre emprego", "Contacto de imprensa", "Fornecimento de produtos ou serviços à Eviden", "Questões sobre alianças ou parcerias", "Outro"],
            "Company_Revenue__c": ["Inferior a 200 milhões de dólares", "De 201 a 500 milhões de dólares", "De 501 milhões a mil milhões de dólares", "Superior a mil milhões de dólares"],
            "Company_Size__c": ["Menos de 3 000 colaboradores", "De 3 001 a 5 000 colaboradores", "De 5 001 a 10 000 colaboradores", "Mais de 10 001 colaboradores"],
            "Purchase_Authority__c": ["Sim", "Não"],
            "Purchase_Timeline__c": ["Menos de 3 meses", "De 3 a 6 meses", "De 6 a 12 meses", "Mais de 12 meses"],
            "Opt_in__c": ["Sim", "Não"],
            "State": [
                "Alabama", "Alasca", "Arizona", "Arcansas", "Califórnia", "Colorado", "Connecticut", "Delaware", "Flórida", "Geórgia",
                "Havai", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Luisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota", "Mississípi", "Missouri", "Montana", "Nebraska", "Nevada", "Nova Hampshire", "Nova Jérsia",
                "Novo México", "Nova Iorque", "Carolina do Norte", "Dakota do Norte", "Ohio", "Oklahoma", "Oregon", "Pensilvânia", "Rhode Island", "Carolina do Sul",
                "Dakota do Sul", "Tennessee", "Texas", "Utah", "Vermont", "Virgínia", "Washington", "Virgínia Ocidental", "Wisconsin", "Wyoming"
            ],
            "JobFunction__c": [
                "Contabilista ou responsável de controlo financeiro", "Gestor de conta", "Assistente", "Diretor de sucursal", "Presidente", "Diretor de conformidade", "Diretor de transformação digital", "Diretor executivo", "Diretor financeiro", "Diretor de sistemas de informação",
                "Diretor de marketing", "Diretor clínico", "Diretor de operações", "Diretor de compras", "Diretor de risco", "Diretor de segurança", "Diretor de tecnologia", "Diretor comercial", "Consultor", "Experiência do cliente",
                "Apoio ao cliente", "Transformação digital", "Diretor-geral", "Diretor de outra área", "Outros diretores", "Diretor de distribuição", "Diretor financeiro", "Diretor de recursos humanos", "Gestor de recursos humanos", "Gestão de aplicações informáticas",
                "Consultoria informática", "Diretor de informática", "Gestor de informática", "Operações informáticas", "Estratégia informática", "Integração de sistemas informáticos", "Outras funções de gestão", "Administrador executivo", "Sócio-gerente", "Gestor de comunicação de marketing",
                "Diretor de marketing", "Membro do conselho de administração", "Membro do conselho fiscal", "Ministro", "Ministro de Estado", "Enfermagem", "Diretor de operações", "Outro", "Assistente pessoal", "Presidente do conselho de administração",
                "Presidente do conselho fiscal", "Imprensa", "Compras", "Gestor de relações públicas", "Gestor de relações públicas", "Diretor de vendas", "Gestor de vendas", "Secretário", "Secretário de Estado", "Supervisor",
                "Vice-presidente", "Vice-presidente do conselho de administração", "Vice-presidente do conselho fiscal"
            ],
            "customerIndustry": [
                "Contabilidade", "Companhias aéreas e aviação", "Resolução alternativa de litígios", "Medicina alternativa", "Animação", "Vestuário e moda", "Arquitetura e planeamento", "Artes e artesanato", "Indústria automóvel", "Aviação e indústria aeroespacial",
                "Banca", "Biotecnologia", "Rádio e televisão", "Materiais de construção", "Material e equipamento empresarial", "Mercados de capitais", "Indústria química", "Organizações cívicas e sociais", "Engenharia civil", "Imobiliário comercial",
                "Segurança informática e de redes", "Jogos de computador", "Equipamento informático", "Redes informáticas", "Programas informáticos", "Construção", "Eletrónica de consumo", "Bens de consumo", "Serviços ao consumidor", "Cosmética",
                "Laticínios", "Defesa e espaço", "Design", "Gestão da educação", "Ensino à distância", "Fabrico de equipamentos elétricos e eletrónicos", "Entretenimento", "Serviços ambientais", "Organização de eventos", "Direção executiva",
                "Gestão de instalações", "Agricultura", "Serviços financeiros", "Belas-artes", "Pesca", "Alimentação e bebidas", "Produção alimentar", "Angariação de fundos", "Mobiliário", "Jogos de fortuna ou azar e casinos",
                "Vidro, cerâmica e betão", "Administração pública", "Relações governamentais", "Design gráfico", "Saúde, bem-estar e condição física", "Ensino superior", "Hospitais e cuidados de saúde", "Hotelaria", "Recursos humanos", "Importação e exportação",
                "Serviços a pessoas e famílias", "Automação industrial", "Serviços de informação", "Tecnologias e serviços de informação", "Seguros", "Relações internacionais", "Comércio internacional e desenvolvimento", "Internet", "Banca de investimento", "Gestão de investimentos",
                "Sistema judicial", "Aplicação da lei", "Advocacia", "Serviços jurídicos", "Órgãos legislativos", "Lazer, viagens e turismo", "Bibliotecas", "Logística e cadeia de abastecimento", "Artigos de luxo e joalharia", "Máquinas e equipamentos",
                "Consultoria de gestão", "Setor marítimo", "Estudos de mercado", "Marketing e publicidade", "Engenharia mecânica ou industrial", "Produção de conteúdos multimédia", "Dispositivos médicos", "Prática médica", "Cuidados de saúde mental", "Forças armadas",
                "Mineração e metalurgia", "Jogos para dispositivos móveis", "Cinema", "Museus e instituições", "Música", "Nanotecnologia", "Jornais", "Gestão de organizações sem fins lucrativos", "Petróleo e energia", "Comunicação social em linha",
                "Outro", "Subcontratação e deslocalização", "Entrega de encomendas e mercadorias", "Embalagens e recipientes", "Papel e produtos florestais", "Artes do espetáculo", "Indústria farmacêutica", "Filantropia", "Fotografia", "Plásticos",
                "Organizações políticas", "Ensino básico e secundário", "Impressão", "Formação e orientação profissional", "Desenvolvimento de programas", "Políticas públicas", "Relações públicas e comunicação", "Segurança pública", "Edição", "Fabrico de material ferroviário",
                "Pecuária", "Imobiliário", "Instalações e serviços recreativos", "Instituições religiosas", "Energias renováveis e ambiente", "Investigação", "Restauração", "Comércio a retalho", "Segurança e investigação", "Semicondutores",
                "Construção naval", "Artigos de desporto", "Desporto", "Recrutamento e seleção", "Supermercados", "Telecomunicações", "Têxteis", "Centros de estudos", "Tabaco", "Tradução e localização",
                "Transportes rodoviários e ferroviários", "Serviços de utilidade pública", "Capital de risco e capital de investimento", "Veterinária", "Armazenagem", "Comércio por grosso", "Vinhos e bebidas espirituosas", "Comunicações sem fios", "Escrita e edição"
            ]
        },
        "privacy": {
            "opening": "A sua privacidade é importante para nós.",
            "law": "O seu país garante-lhe direitos ao abrigo da legislação {law}.",
            "acceptance": "Ao submeter este formulário, aceita os termos da nossa <a href='https://eviden.com/privacy-policy/' target='_blank' rel='noopener noreferrer'>política de privacidade</a>.",
            "generic": "Leia-a para compreender como garantimos o respeito pelos seus direitos.",
            "regional": "Leia-a para compreender como garantimos o respeito pelos seus direitos e como pode eliminar os seus dados, se assim o desejar."
        },
        "optInTexts": [
            "*Para receber comunicações relevantes da Eviden sobre os nossos eventos e ofertas, dê o seu consentimento. Pode cancelar a subscrição a qualquer momento.",
            "Ao fornecer as suas informações neste formulário, consente receber comunicações da Eviden sobre os nossos eventos e ofertas, de acordo com a nossa política de privacidade. Pode cancelar a subscrição a qualquer momento."
        ],
        "select": "Selecione", "submit": "Enviar",
        "thanks": "Obrigado pelo seu interesse.", "thanksFor": "Obrigado pelo seu interesse em",
        "download": "Pode descarregar o relatório aqui.", "contact": "Um membro da nossa equipa entrará em contacto consigo em breve."
    },
    "KO": {
        "labels": {
            "Salutation": "호칭", "FirstName": "이름 *", "LastName": "성 *",
            "Email": "업무용 이메일 주소 *", "customerIndustry": "업종 *", "Phone": "업무용 전화번호 *",
            "Company": "회사 또는 기관명 *", "Company_Revenue__c": "회사 매출", "Company_Size__c": "회사 규모",
            "Country": "국가 또는 지역 *", "State": "주 *", "JobFunction__c": "직무", "SF_Job_Title__c": "직책",
            "interestedIn": "제품 *", "enquiryType": "문의 유형 *", "enquiry": "문의 내용",
            "Purchase_Authority__c": "구매 권한", "Purchase_Timeline__c": "구매 예정 시기", "Opt_in__c": "정보 수신 동의 *"
        },
        "required": "필수 입력 항목입니다", "selectRequired": "이 항목에서 값을 선택해 주세요",
        "emailRequired": "올바른 이메일 주소를 입력해 주세요", "phoneRequired": "올바른 전화번호를 입력해 주세요",
        "options": {
            "Salutation": ["남성 호칭", "기혼 여성 호칭", "여성 호칭", "미혼 여성 호칭", "성 중립 호칭", "소년 호칭", "경", "박사"],
            "interestedIn": ["ID 및 접근 관리(IAM) 솔루션", "통합 로그인(SSO)", "강력한 인증 관리", "ID 거버넌스 및 관리", "웹 접근 관리", "Orbion(서비스형 ID)", "고가용성(SafeKit)", "지능형 ID 분석", "DirX", "기타"],
            "enquiryType": ["제품 정보", "견적", "제품 시연", "무료 평가판", "개념 검증(POC)", "교육 및 인증", "귀사를 위한 새로운 솔루션 또는 서비스", "제품 및 고객 지원(기존 Eviden 고객 전용)", "회계, 청구 또는 결제", "채용 정보", "언론 문의", "Eviden에 제품 또는 서비스 공급", "제휴 및 파트너십 관련 사항", "기타"],
            "Company_Revenue__c": ["2억 달러 미만", "2억 100만~5억 달러", "5억 100만~10억 달러", "10억 달러 초과"],
            "Company_Size__c": ["직원 3,000명 미만", "직원 3,001~5,000명", "직원 5,001~10,000명", "직원 10,001명 초과"],
            "Purchase_Authority__c": ["예", "아니요"],
            "Purchase_Timeline__c": ["3개월 미만", "3~6개월", "6~12개월", "12개월 초과"],
            "Opt_in__c": ["예", "아니요"],
            "State": [
                "앨라배마", "알래스카", "애리조나", "아칸소", "캘리포니아", "콜로라도", "코네티컷", "델라웨어", "플로리다", "조지아",
                "하와이", "아이다호", "일리노이", "인디애나", "아이오와", "캔자스", "켄터키", "루이지애나", "메인", "메릴랜드",
                "매사추세츠", "미시간", "미네소타", "미시시피", "미주리", "몬태나", "네브래스카", "네바다", "뉴햄프셔", "뉴저지",
                "뉴멕시코", "뉴욕", "노스캐롤라이나", "노스다코타", "오하이오", "오클라호마", "오리건", "펜실베이니아", "로드아일랜드", "사우스캐롤라이나",
                "사우스다코타", "테네시", "텍사스", "유타", "버몬트", "버지니아", "워싱턴", "웨스트버지니아", "위스콘신", "와이오밍"
            ],
            "JobFunction__c": [
                "회계사 또는 재무 관리 책임자", "고객 담당 관리자", "보조 직원", "지점장", "회장", "최고 준법 책임자", "최고 디지털 책임자", "최고 경영자", "최고 재무 책임자", "최고 정보 책임자",
                "최고 마케팅 책임자", "최고 의료 책임자", "최고 운영 책임자", "최고 구매 책임자", "최고 위험 관리 책임자", "최고 보안 책임자", "최고 기술 책임자", "영업 총괄 이사", "컨설턴트", "고객 경험",
                "고객 서비스", "디지털 전환", "총괄 이사", "기타 분야 이사", "기타 이사", "유통 이사", "재무 이사", "인사 이사", "인사 관리자", "IT 애플리케이션 관리",
                "IT 컨설팅", "IT 이사", "IT 관리자", "IT 운영", "IT 전략", "IT 시스템 통합", "기타 관리직", "대표 이사", "대표 파트너", "마케팅 커뮤니케이션 관리자",
                "마케팅 이사", "이사회 구성원", "감독 위원회 구성원", "장관", "국무 장관", "간호", "운영 이사", "기타", "개인 비서 또는 보조 직원", "이사회 의장",
                "감독 위원회 의장", "언론", "구매", "홍보 관리자", "홍보 관리자", "영업 이사", "영업 관리자", "비서", "국무 차관", "감독자",
                "부회장", "이사회 부의장", "감독 위원회 부의장"
            ],
            "customerIndustry": [
                "회계", "항공 운송", "대체 분쟁 해결", "대체 의학", "애니메이션", "의류 및 패션", "건축 및 계획", "미술 및 공예", "자동차", "항공 및 우주",
                "은행업", "생명 공학", "방송 매체", "건축 자재", "사무용품 및 기업 장비", "자본 시장", "화학", "시민 및 사회 단체", "토목 공학", "상업용 부동산",
                "컴퓨터 및 네트워크 보안", "컴퓨터 게임", "컴퓨터 하드웨어", "컴퓨터 네트워크", "컴퓨터 소프트웨어", "건설", "소비자 가전", "소비재", "소비자 서비스", "화장품",
                "낙농", "국방 및 우주", "디자인", "교육 관리", "온라인 교육", "전기 및 전자 제품 제조", "엔터테인먼트", "환경 서비스", "행사 서비스", "경영진 사무실",
                "시설 관리 서비스", "농업", "금융 서비스", "순수 미술", "수산업", "식품 및 음료", "식품 생산", "기금 모금", "가구", "도박 및 카지노",
                "유리, 세라믹 및 콘크리트", "정부 행정", "정부 관계", "그래픽 디자인", "건강, 웰빙 및 피트니스", "고등 교육", "병원 및 의료", "숙박업", "인사", "수출입",
                "개인 및 가족 서비스", "산업 자동화", "정보 서비스", "정보 기술 및 서비스", "보험", "국제 문제", "국제 무역 및 개발", "인터넷", "투자 은행", "투자 관리",
                "사법부", "법 집행", "법률 실무", "법률 서비스", "입법 기관", "레저, 여행 및 관광", "도서관", "물류 및 공급망", "명품 및 보석", "기계",
                "경영 컨설팅", "해운", "시장 조사", "마케팅 및 광고", "기계 또는 산업 공학", "미디어 제작", "의료 기기", "의료 실무", "정신 건강 관리", "군대",
                "광업 및 금속", "모바일 게임", "영화", "박물관 및 기관", "음악", "나노 기술", "신문", "비영리 단체 관리", "석유 및 에너지", "온라인 미디어",
                "기타", "외주 및 해외 이전", "소포 및 화물 배송", "포장 및 용기", "종이 및 임산물", "공연 예술", "제약", "자선 사업", "사진", "플라스틱",
                "정치 단체", "초등 및 중등 교육", "인쇄", "전문 교육 및 코칭", "프로그램 개발", "공공 정책", "홍보 및 커뮤니케이션", "공공 안전", "출판", "철도 차량 제조",
                "목축업", "부동산", "레크리에이션 시설 및 서비스", "종교 기관", "재생 에너지 및 환경", "연구", "음식점", "소매업", "보안 및 조사", "반도체",
                "조선업", "스포츠 용품", "스포츠", "인력 공급 및 채용", "슈퍼마켓", "통신", "섬유", "정책 연구소", "담배", "번역 및 현지화",
                "운송, 화물 및 철도", "공익사업", "벤처 캐피털 및 사모 투자", "수의업", "창고업", "도매업", "와인 및 증류주", "무선 통신", "집필 및 편집"
            ]
        },
        "privacy": {
            "opening": "저희는 귀하의 개인정보를 소중히 여깁니다.",
            "law": "귀하의 국가에서는 {law}에 따라 관련 권리를 보장합니다.",
            "acceptance": "이 양식을 제출하면 당사의 <a href='https://eviden.com/privacy-policy/' target='_blank' rel='noopener noreferrer'>개인정보처리방침</a> 약관에 동의하는 것으로 간주됩니다.",
            "generic": "귀하의 권리를 어떻게 보호하는지 알아보려면 해당 방침을 읽어 주세요.",
            "regional": "귀하의 권리를 어떻게 보호하는지, 그리고 원하실 경우 데이터를 삭제하는 방법을 알아보려면 해당 방침을 읽어 주세요."
        },
        "optInTexts": [
            "*Eviden의 행사 및 제품과 서비스에 관한 관련 정보를 받으시려면 수신에 동의해 주세요. 언제든지 수신을 거부할 수 있습니다.",
            "이 양식에 정보를 제공하면 당사의 개인정보처리방침에 따라 Eviden의 행사 및 제품과 서비스에 관한 정보를 받는 데 동의하게 됩니다. 언제든지 수신을 거부할 수 있습니다."
        ],
        "select": "선택해 주세요", "submit": "제출",
        "thanks": "관심을 가져 주셔서 감사합니다.", "thanksFor": "다음 항목에 관심을 가져 주셔서 감사합니다:",
        "download": "여기에서 보고서를 다운로드할 수 있습니다.", "contact": "담당자가 곧 연락드리겠습니다."
    }
};

const formCountryCodes = {
    "Aland Islands": "AX", "Antigua and Barbuda": "AG", "BelarusBelarus": "BY",
    "Bolivia, Plurinational State of": "BO", "Bonaire, Sint Eustatius and Saba": "BQ",
    "Bosnia and Herzegovina": "BA", "Brunei Darussalam": "BN", "Congo": "CG",
    "Congo, the Democratic Republic of the": "CD", "Cote d'Ivoire": "CI", "Czech Republic": "CZ",
    "Falkland Islands (Malvinas)": "FK", "Heard Island and McDonald Islands": "HM",
    "Holy See (Vatican City State)": "VA", "Hong Kong S.A.R., China": "HK",
    "Iran, Islamic Republic of": "IR", "Korea, Democratic People's Republic of": "KP",
    "Korea, Republic of": "KR", "Lao People's Democratic Republic": "LA", "Libyan Arab Jamahiriya": "LY",
    "Macao S.A.R., China": "MO", "Macedonia, the former Yugoslav Republic of": "MK",
    "Micronesia, Federated States of": "FM", "Moldova, Republic of": "MD", "Myanmar": "MM",
    "N.Mariana Islnd": "MP", "Palestinian Territory, Occupied": "PS", "Pitcairn": "PN",
    "Reunion": "RE", "Russian Federation": "RU", "Saint Barthélemy": "BL",
    "Saint Helena, Ascension and Tristan da Cunha": "SH", "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC", "Saint Martin (French part)": "MF", "Saint Pierre and Miquelon": "PM",
    "Saint Vincent and the Grenadines": "VC", "Samoa, American": "AS", "Sao Tome and Principe": "ST",
    "Sint Maarten (Dutch part)": "SX", "South Georgia and the South Sandwich Islands": "GS",
    "Svalbard and Jan Mayen": "SJ", "Swaziland": "SZ", "Syrian Arab Republic": "SY",
    "Tanzania, United Republic of": "TZ", "Trinidad and Tobago": "TT", "Turkey": "TR",
    "Turks and Caicos Islands": "TC", "US Minor Outl.Isl.": "UM",
    "Venezuela, Bolivarian Republic of": "VE", "Virgin Islands, British": "VG",
    "Virgin Islands, US": "VI", "Wallis and Futuna": "WF"
};
const englishRegionNames = new Intl.DisplayNames(["en"], { type: "region", fallback: "none" });
for (const firstLetter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    for (const secondLetter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        const code = firstLetter + secondLetter;
        const name = englishRegionNames.of(code);
        if (name && !formCountryCodes[name]) formCountryCodes[name] = code;
    }
}

Object.entries(additionalFormLanguages).forEach(function ([language, translations]) {
    const localized = JSON.parse(JSON.stringify(languageTranslations["English US"]));
    Object.entries(translations.labels).forEach(function ([fieldName, label]) {
        const field = localized[fieldName];
        field.label = label;
        if (field.requiredError) {
            field.requiredError = field.type === "email" ? translations.emailRequired :
                field.type === "telephone" ? translations.phoneRequired :
                field.type === "select" || field.type === "radio" ? translations.selectRequired : translations.required;
        }
        if (field.options && field.options[0].value === "") field.options[0].text = translations.select;
    });
    Object.entries(translations.options || {}).forEach(function ([fieldName, texts]) {
        const field = localized[fieldName];
        const labels = field.options[0].value === "" ? [translations.select].concat(texts) : texts;
        field.options.forEach(function (option, index) { option.text = labels[index]; });
    });
    const regionNames = new Intl.DisplayNames([language.toLowerCase()], { type: "region", fallback: "none" });
    const exceptionalRegions = {
        "AR": { "Crimea Region": "منطقة القرم", "Netherlands Antilles": "جزر الأنتيل الهولندية" },
        "PT-PT": { "Crimea Region": "Região da Crimeia", "Netherlands Antilles": "Antilhas Neerlandesas" },
        "KO": { "Crimea Region": "크림반도 지역", "Netherlands Antilles": "네덜란드령 안틸레스" }
    };
    localized.Country.options.forEach(function (option) {
        if (!option.value) return;
        const code = formCountryCodes[option.value];
        option.text = exceptionalRegions[language][option.value] || (code && regionNames.of(code)) || option.text;
    });
    localized.PrivacyText.forEach(function (option) {
        const law = option.value === "CCPA" ? "CCPA/CPRA" : option.value === "LGDP" ? "LGPD" : option.value;
        option.text = [translations.privacy.opening,
            option.value === "none" ? "" : translations.privacy.law.replace("{law}", law),
            translations.privacy.acceptance,
            option.value === "none" ? translations.privacy.generic : translations.privacy.regional
        ].filter(Boolean).join(" ");
    });
    localized.OptInText.forEach(function (option, index) { option.text = translations.optInTexts[index]; });
    localized.Submit.text = translations.submit;
    localized.ThankYouEmptyDataContent = translations.thanks;
    localized.ThankYouDataContent = translations.thanksFor;
    localized.DownloadLinkText = translations.download;
    localized.ContactTYText = translations.contact;
    languageTranslations[language] = localized;
});