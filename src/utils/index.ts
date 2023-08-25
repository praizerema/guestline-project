import cogoToast from "cogo-toast";


export const _isAnEmptyObject = (obj:[]) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};


export const showToast = (message: string, type: string) => {
  switch (type) {
    case "success":
      cogoToast.success(message, { position: "top-right", hideAfter: 5 });
      break;
    case "info":
      cogoToast.info(message, { position: "top-right", hideAfter: 10 });
      break;
    case "loading":
      cogoToast.loading(message, { position: "top-right", hideAfter: 10 });
      break;
    case "warn":
      cogoToast.warn(message, { position: "top-right", hideAfter: 10 });
      break;
    case "error":
      cogoToast.error(message, { position: "top-right", hideAfter: 15 });
      break;

    default:
      cogoToast.info(message, { position: "top-right", hideAfter: 10 });
      break;
  }
};

export const _copyToClipboard = (str:string, message: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return showToast(message || "Copied", "info");
  // return;
};

export const _textCapitalize = (text:string) => {
  return text && text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const _wordsCapitalize = (words:string) => {
  const newWord = words
    .toLowerCase()
    .split(" ")
    .map((word) => _textCapitalize(word))
    .join(" ");
  return newWord;
};

export const _formatNumber = (value:any) => new Intl.NumberFormat().format(value);

export const _removeUnderscore = (word: string) => word?.split("_").join(" ");

export const convertTimeToSeconds = (duration:any) => {
  const [hours, minutes, seconds] = duration.split(":");
  return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
};


export const formatDate = (timestamp: any) => {
  const dateObj = new Date(timestamp);
  const options: object = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return dateObj.toLocaleString("en-NG", options);
};


