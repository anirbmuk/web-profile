export const downloadFile = (url: string) => {
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
