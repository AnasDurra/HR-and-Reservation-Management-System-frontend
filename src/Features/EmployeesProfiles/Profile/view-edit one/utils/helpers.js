export const downloadFile = (file) => {
    if (file instanceof File) {
      const fileUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = file.name; // Use the file's original name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl); // Release the memory
    } else {
      console.error("Invalid file object");
      console.log(file);
    }
  };