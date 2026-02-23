import { getAnalysis } from "@/redux/analysisData.store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const AnalysisPage = () => {

  const dispatch = useAppDispatch();
  const {loading, analysisData} = useAppSelector(state => state.analysis);

  useEffect(() => {
    dispatch(getAnalysis('example.com'));
  }, []);

  if (loading || !analysisData) {
    return <div>Загрузка</div>
  }
  console.log(analysisData);

  return (
    <div>
        <h1>Analysis Page</h1>
    </div>
  )
}

export default AnalysisPage;
