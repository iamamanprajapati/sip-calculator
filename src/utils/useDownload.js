export const handleDownload = (results) => {
    if (results.length === 0) {
      setError("No results to download.");
      return;
    }

    const csvData = results
      .map((result) => Object.values(result).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "sip_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // setError("");
  };