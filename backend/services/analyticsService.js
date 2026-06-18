const getAnalytics = (tasks)=>{

  const total = tasks.length;

  const completed =
  tasks.filter(
    t=>t.status==="Completed"
  ).length;

  const pending =
  tasks.filter(
    t=>t.status==="Pending"
  ).length;

  const overdue =
  tasks.filter(
    t=> new Date(t.deadline)<new Date()
  ).length;

  return{

    total,
    completed,
    pending,
    overdue,

    completionRate:
      total
      ? ((completed/total)*100).toFixed(2)
      : 0
  };
};

module.exports = getAnalytics;