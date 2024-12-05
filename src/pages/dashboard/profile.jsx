import * as react from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { conversationsData } from "@/data";
import { useState, useEffect } from "react";
import { db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";

export function Profile() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize state with default values
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [expenses, setExpenses] = useState({
    food: 0,
    rent: 0,
    fuel: 0,
    electricity: 0,
    waterBill: 0,
    labour: 0,
    printerInk: 0,
    paper: 0,
    salaries: 0,
    tags: 0,
    misc: 0,
    maintenance: 0,
    insurance: 0,
    taxes: 0,
  });
  const [total, setTotal] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

// Fetch all months' data initially
useEffect(() => {
  const fetchAllMonthsData = async () => {
    try {
      const userId = "user123"; // Replace with dynamic user ID
      const fetchedData = await Promise.all(
        months.map(async (month) => {
          const docRef = doc(db, "expenses", `${userId}_${month}`);
          const docSnap = await getDoc(docRef);
          return docSnap.exists()
            ? { name: month, total: docSnap.data().total || 0 }
            : { name: month, total: 0 };
        })
      );
      setMonthlyData(fetchedData);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  fetchAllMonthsData();
}, []);

  // Fetch data based on the selected month
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = "user123"; // Replace with dynamic user ID if needed
        const monthKey = `${userId}_${months[selectedMonth]}`;
        const docRef = doc(db, "expenses", monthKey);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setExpenses(data.expenses || expenses); // Use fetched data or default values
          setTotal(data.total || 0);
        } else {
          // Reset data if no document exists for the selected month
          setExpenses({
            food: 0,
            rent: 0,
            fuel: 0,
            electricity: 0,
            waterBill: 0,
            labour: 0,
            printerInk: 0,
            paper: 0,
            salaries: 0,
            tags: 0,
            misc: 0,
            maintenance: 0,
            insurance: 0,
            taxes: 0,
          });
          setTotal(0);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [selectedMonth]); // Refetch data when the selected month changes

  // Handle input changes and recalculate total
  const handleChange = (field, value) => {
    const numericValue = parseFloat(value) || 0; // Ensure value is a number or zero
    setExpenses((prev) => {
      const updatedExpenses = { ...prev, [field]: numericValue };
      const newTotal = Object.values(updatedExpenses).reduce(
        (acc, curr) => acc + (parseFloat(curr) || 0),
        0
      );
      setTotal(newTotal); // Update total
      return updatedExpenses;
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const userId = "user123"; // Replace with dynamic user ID if needed
      const monthKey = `${userId}_${months[selectedMonth]}`;
      await setDoc(doc(db, "expenses", monthKey), { expenses, total });
      alert("Expenses saved successfully!");
    } catch (error) {
      console.error("Error saving expenses: ", error);
      alert("Failed to save expenses. Please try again.");
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <react.Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <react.CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div>
                <react.Typography variant="h5" color="blue-gray" className="mb-1">
                  Total Expenses
                </react.Typography>
                <react.Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  These are all the expenses accumulated monthly
                </react.Typography>
              </div>
            </div>
            <div className="w-96">
              <react.Tabs value="app">
                <react.TabsHeader>
                  <react.Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </react.Tab>
                  <react.Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </react.Tab>
                  <react.Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </react.Tab>
                </react.TabsHeader>
              </react.Tabs>
            </div>
          </div>
          <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <react.Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </react.Typography>
              <div className="flex flex-col gap-4">
                <react.Select
                  label="Select Month"
                  value={months[selectedMonth]}
                  onChange={(e) => setSelectedMonth(months.indexOf(e.target.value))}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </react.Select>
                {Object.keys(expenses).map((key) => (
                  <react.Input
                    key={key}
                    label={key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
                    value={expenses[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ))}
                <react.Typography variant="h6" color="blue-gray" className="mt-4">
                  Total: R{total.toFixed(2)}
                </react.Typography>
                <react.Button
                   variant="gradient" size="lg" color="blue" 
                  onClick={handleSubmit}
                >
                  Submit
                </react.Button>
              </div>
            </div>
            <ProfileInfoCard
              title="Current Monthly Costs"
              description="These are costs which will be deducted at the end of the month."
              details={{ ...expenses, Total: `R${total.toFixed(2)}` }}
              action={
                <react.Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </react.Tooltip>
              }
            />
            <div>
              <react.Typography variant="h6" color="blue-gray" className="mb-3">
                Total Monthly Cost
              </react.Typography>
              <ul className="flex flex-col gap-6">
                {monthlyData.map((data) => (
                  <MessageCard
                    key={data.name}
                    img="/img/team-placeholder.jpeg"
                    name={data.name}
                    message={`R${data.total.toFixed(2)}`}
                    action={
                      <react.Button variant="gradient" size="lg" color="blue">
                        Download Proof
                      </react.Button>
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
        </react.CardBody>
      </react.Card>
    </>
  );
}

export default Profile;
