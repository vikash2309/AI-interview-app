import {
  createContext,
  useContext,
  useState,
} from "react";

const InterviewContext =
  createContext();

export const InterviewProvider = ({
  children,
}) => {
  const [interviews, setInterviews] =
    useState([]);

  const [
    loadingInterviews,
    setLoadingInterviews,
  ] = useState(false);

  return (
    <InterviewContext.Provider
      value={{
        interviews,
        setInterviews,
        loadingInterviews,
        setLoadingInterviews,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview =
  () =>
    useContext(
      InterviewContext
    );