// import { useState, createContext, useEffect } from "react";
// import axios from "../configs/axios";

// export const PlanContext = createContext();

// export default function PlanContextProvider({ children }) {
//   const [planData, setPlanData] = useState(null);
//   const [selectedPlanNo, setSelectedPlanNo] = useState(null);
//   const [qmprocessData, setQMprocessData] = useState(null);
//   const [processData, setProcessData] = useState(null);
//   const [plprogressData, setPlProgressData] = useState(null);
//   const [ScheduleData, setScheduleData] = useState(null);
//   const [PartsData, setPartsData] = useState(null);
//   const searchPartsData = async (orderNo) => {
//     try {
//       const response = await axios.post("/plan/search-order-plan", {
//         Order_No: orderNo,
//       });

//       if (
//         response.data &&
//         response.data.data &&
//         Array.isArray(response.data.data.partsNo)
//       ) {
//         setSelectedPlanNo(response.data.data.partsNo);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("Error fetching order data:", error);
//       return false;
//     }
//   };

//   const selectPartsData = async (orderNo, partsNO) => {
//     try {
//       const response = await axios.post("/plan/search-part-plan", {
//         Order_No: orderNo,
//         Parts_No: partsNO,
//       });

//       if (
//         response.data &&
//         response.data.data &&
//         Array.isArray(response.data.data)
//       ) {
//         setPlanData(response.data.data);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("Error fetching order data:", error);
//       return false;
//     }
//   };

//   const QM_Process = async () => {
//     try {
//       const response = await axios.get("/process/fetch-qmprocess");
//       console.log("Fetched Data:", response.data.data.process); // ตรวจสอบข้อมูล
//       setQMprocessData(response.data.data.process); // เข้าถึงข้อมูล process อย่างถูกต้อง
//       return response;
//     } catch (error) {
//       console.error("Error fetching process groups:", error);
//       throw error;
//     }
//   };

//   const Process = async () => {
//     try {
//       const response = await axios.get("/process/fetch-process");
//       console.log("Fetched Data:", response.data.data.process); // ตรวจสอบข้อมูล
//       setProcessData(response.data.data.process); // เข้าถึงข้อมูล process อย่างถูกต้อง
//       return response;
//     } catch (error) {
//       console.error("Error fetching process groups:", error);
//       throw error;
//     }
//   };

//   const fetchPlprogress = async () => {
//     try {
//       const response = await axios.get("/plprogress/fetch-plprogress");
//       console.log("Fetched Data:", response.data.data.plprogress); 
//       setPlProgressData(response.data.data.plprogress); 
//       return response;
//     } catch (error) {
//       console.error("Error fetching plprogress groups:", error);
//       throw error;
//     }
//   };

//   const fetchSchedule = async () => {
//     try {
//       const response = await axios.get("/schedule/fetch-schedule");
//       console.log("Fetched Data:", response.data.data.schedule); 
//       setScheduleData(response.data.data.schedule); 
//       return response;
//     } catch (error) {
//       console.error("Error fetching schedule groups:", error);
//       throw error;
//     }
//   };

//   const fetchParts = async () => {
//     try {
//       const response = await axios.get("/parts/fetch-parts");
//       console.log("Fetched Data:", response.data.data.parts); 
//       setPartsData(response.data.data.parts); 
//       return response;
//     } catch (error) {
//       console.error("Error fetching parts groups:", error);
//       throw error;
//     }
//   };


//   useEffect(() => {
//     QM_Process();
//     Process();
//     fetchPlprogress();
//     fetchSchedule();
//     fetchParts();
//   }, []);

//   return (
//     <PlanContext.Provider
//       value={{
//         planData,
//         setPlanData,
//         selectedPlanNo,
//         setSelectedPlanNo,
//         searchPartsData,
//         selectPartsData,
//         qmprocessData,
//         processData,
//         plprogressData,
//         setPlProgressData,
//         ScheduleData, 
//         setScheduleData,
//         PartsData,
//       }}
//     >
//       {children}
//     </PlanContext.Provider>
//   );
// }


// new version 

import { useState, createContext, useEffect } from "react";
import axios from "../configs/axios";

export const PlanContext = createContext();

export default function PlanContextProvider({ children }) {
  const [planData, setPlanData] = useState([]); // Default to empty array
  const [selectedPlanNo, setSelectedPlanNo] = useState(null);
  const [qmprocessData, setQMprocessData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [plprogressData, setPlProgressData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [partsData, setPartsData] = useState([]);

  const searchPartsData = async (orderNo) => {
    try {
      const response = await axios.post("/plan/search-order-plan", { Order_No: orderNo });

      if (response.data?.data?.partsNo) {
        setSelectedPlanNo(response.data.data.partsNo);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching order data:", error);
      return false;
    }
  };

  const selectPartsData = async (orderNo, partsNo) => {
    try {
      const response = await axios.post("/plan/search-part-plan", {
        Order_No: orderNo,
        Parts_No: partsNo,
      });

      if (response.data?.data) {
        setPlanData(response.data.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching part data:", error);
      return false;
    }
  };

  const QM_Process = async () => {
    try {
      const response = await axios.get("/process/fetch-qmprocess");
      setQMprocessData(response.data?.data?.process || []);
    } catch (error) {
      console.error("Error fetching QM process:", error);
    }
  };

  const Process = async () => {
    try {
      const response = await axios.get("/process/fetch-process");
      setProcessData(response.data?.data?.process || []);
    } catch (error) {
      console.error("Error fetching process:", error);
    }
  };

  const fetchPlprogress = async () => {
    try {
      const response = await axios.get("/plprogress/fetch-plprogress");
      setPlProgressData(response.data?.data?.plprogress || []);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await axios.get("/schedule/fetch-schedule");
      setScheduleData(response.data?.data?.schedule || []);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  const fetchParts = async () => {
    try {
      const response = await axios.get("/parts/fetch-parts");
      setPartsData(response.data?.data?.parts || []);
    } catch (error) {
      console.error("Error fetching parts data:", error);
    }
  };

  const deletePlan = async (orderNo, partsNo) => {
    try {
      const response = await axios.post("/plan/delete", { Order_No: orderNo, Parts_No: partsNo });

      if (response.status === 200) {
        setPlanData((prevPlanData) =>
          prevPlanData.map((plan) =>
            plan.Order_No === orderNo && plan.Parts_No === partsNo
              ? { ...plan, isDeleted: true }
              : plan
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error performing soft delete:", error);
      return false;
    }
  };

  useEffect(() => {
    QM_Process();
    Process();
    fetchPlprogress();
    fetchSchedule();
    fetchParts();
  }, []);

  return (
    <PlanContext.Provider
      value={{
        planData,
        setPlanData,
        selectedPlanNo,
        setSelectedPlanNo,
        searchPartsData,
        selectPartsData,
        qmprocessData,
        processData,
        plprogressData,
        setPlProgressData,
        scheduleData,
        setScheduleData,
        partsData,
        deletePlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}
