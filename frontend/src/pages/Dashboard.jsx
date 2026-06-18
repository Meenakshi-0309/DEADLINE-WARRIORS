import AnalyticsDonutChart from "./AnalyticsDonutChart";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios
      .get("/api/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAnalytics(res.data));
  }, []);

  return (
    <div>
      {analytics && (
        <AnalyticsDonutChart analytics={analytics} />
      )}
    </div>
  );
}