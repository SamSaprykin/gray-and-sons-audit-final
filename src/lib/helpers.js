export const removeNbsp = (target) => {
  return target.replace(/\u00a0/g, " ");
};

export function slugify(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/-+/g, "-") // Replace consecutive dashes with a single dash
    .replace(/^-|-$/g, ""); // Remove dashes from the beginning and end
}

export const truncateText = (text, limit) => {
  return text && (text.length <= limit ? text : `${text.slice(0, limit)}...`);
};
