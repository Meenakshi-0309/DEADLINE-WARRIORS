const calculatePriority = (deadline) => {

  const today = new Date();

  const diffDays =
  Math.ceil(
  (new Date(deadline) - today) /
  (1000*60*60*24)
  );

  if(diffDays <= 2)
    return "High";

  if(diffDays <= 5)
    return "Medium";

  return "Low";
};

module.exports = calculatePriority;