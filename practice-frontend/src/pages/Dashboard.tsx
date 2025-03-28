import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ShoppingCart, CreditCard, TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  const [expenseData, setExpenseData] = useState([
    { name: "Food", value: 500 },
    { name: "Transport", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Shopping", value: 400 },
    { name: "Bills", value: 600 },
  ]);

  const [monthlyExpenseData, setMonthlyExpenseData] = useState([
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1200 },
    { name: "Mar", value: 900 },
    { name: "Apr", value: 1400 },
    { name: "May", value: 1100 },
  ]);

  const [budgetData, setBudgetData] = useState({
    totalBudget: 5000,
    spent: 3500,
    remaining: 1500,
  });

  const [financialGoals, setFinancialGoals] = useState([
    { name: "Vacation Fund", target: 2000, saved: 1200 },
    { name: "Emergency Fund", target: 5000, saved: 3000 },
  ]);

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudgetData((prevData) => ({
      ...prevData,
      [name]: Number(value),
      remaining: prevData.totalBudget - Number(value),
    }));
  };

  const handleGoalChange = (index, e) => {
    const { name, value } = e.target;
    const newGoals = [...financialGoals];
    newGoals[index][name] = Number(value);
    setFinancialGoals(newGoals);
  };

  const fetchData = () => {
    // Here, you would fetch data from the backend based on the selected month, category, and period.
    // For now, we'll just log the selections.
    console.log("Fetching data for:", {
      month: selectedMonth,
      category: selectedCategory,
      period: selectedPeriod,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker Dashboard</h1>
      <div className="mb-6 flex space-x-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <Button onClick={fetchData}>Fetch Data</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="w-6 h-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budgetData.spent}</p>
            <Progress value={(budgetData.spent / budgetData.totalBudget) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bills Paid</CardTitle>
            <ShoppingCart className="w-6 h-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15</p>
            <Progress value={50} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spending Trend</CardTitle>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Increasing</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BarChartIcon className="w-6 h-6 text-gray-500 mr-2" /> Monthly Expense Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyExpenseData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Bar dataKey="value" fill="#FF6384" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <PieChartIcon className="w-6 h-6 text-gray-500 mr-2" /> Category-wise Expenses
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Overview</CardTitle>
            <CreditCard className="w-6 h-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Total Budget</label>
              <input
                type="number"
                name="totalBudget"
                value={budgetData.totalBudget}
                onChange={handleBudgetChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Spent</label>
              <input
                type="number"
                name="spent"
                value={budgetData.spent}
                onChange={handleBudgetChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <p className="text-2xl font-bold">${budgetData.remaining} remaining</p>
            <Progress value={(budgetData.remaining / budgetData.totalBudget) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Goals</CardTitle>
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            {financialGoals.map((goal, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg font-semibold">{goal.name}</p>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Target</label>
                  <input
                    type="number"
                    name="target"
                    value={goal.target}
                    onChange={(e) => handleGoalChange(index, e)}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Saved</label>
                  <input
                    type="number"
                    name="saved"
                    value={goal.saved}
                    onChange={(e) => handleGoalChange(index, e)}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <Progress value={(goal.saved / goal.target) * 100} className="mt-2" />
                <p className="text-sm text-gray-500">${goal.saved} of ${goal.target}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button>View Detailed Report</Button>
      </div>
    </div>
  );
};

export default Dashboard;
