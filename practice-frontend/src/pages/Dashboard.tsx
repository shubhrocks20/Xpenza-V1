import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ShoppingCart, CreditCard, TrendingUp } from "lucide-react";

const expenseData = [
  { name: "Food", value: 500 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Shopping", value: 400 },
  { name: "Bills", value: 600 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const monthlyExpenseData = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 900 },
  { name: "Apr", value: 1400 },
  { name: "May", value: 1100 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/100 p-6">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="w-6 h-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$3,500</p>
            <Progress value={70} className="mt-2" />
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
          <h2 className="text-lg font-semibold mb-4">Monthly Expense Overview</h2>
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
          <h2 className="text-lg font-semibold mb-4">Category-wise Expenses</h2>
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
      <div className="mt-6 flex justify-end">
        <Button>View Detailed Report</Button>
      </div>
    </div>
  );
};

export default Dashboard;