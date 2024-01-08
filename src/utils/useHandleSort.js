export const handleSort = (
    sortConfig,
    setSortConfig,
    key
    ) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };