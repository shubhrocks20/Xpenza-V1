import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import RecentUploads from "./RecentUploads";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { autoBill, manualBill } from "@/http";
import Instructions from "./uploadInstruction";

export default function XpenzaUpload() {
  const [file, setFile] = useState<any>(null);
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined);

  // New state variables for manual form inputs
  const [merchantName, setMerchantName] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const queryClient = useQueryClient();

  const handleFileChange = (e: any) => {
    if (e.target.files.length > 1) {
      toast("Only one file allowed", {
        description: "Please upload only one file at a time.",
      });
      return;
    }
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      !["image/jpeg", "image/png"].includes(selectedFile.type)
    ) {
      toast("Invalid file type", {
        description: "Only JPEG and PNG files are allowed.",
      });
      return;
    }
    setFile(selectedFile);
  };

  const fileSubmitMutation = useMutation({
    mutationFn: autoBill,
    onSuccess: (data) => {
      toast(data.success, {
        description: data.message,
      });
      queryClient.invalidateQueries({queryKey: ["uploads"]});
    },
    onError: (err: any) => {
      console.log(err);
      toast(err.response.data.error.message, {
        description: err.response.data.message,
      });
    }
  });

  const manualFormMutation = useMutation({
    mutationFn: manualBill,
    onSuccess: (data) => {
      toast(data.success, {
        description: data.message,
      });
      queryClient.invalidateQueries({queryKey: ["uploads"]});
      setMerchantName('');
      setTotalAmount('');
      setCategory('');
      setPurchaseDate(undefined);
    },
    onError: (err: any) => {
      console.log(err);
      toast(err.response.data.error.message, {
        description: err.response.data.message,
      });
    }
  });

  const handleManualSubmit = (e: any) => {
    e.preventDefault();

    // Validate inputs
    if (!merchantName.trim()) {
      toast("Validation Error", {
        description: "Merchant Name is required"
      });
      return;
    }

    if (!totalAmount || parseFloat(totalAmount) <= 0) {
      toast("Validation Error", {
        description: "Please enter a valid amount"
      });
      return;
    }

    if (!category) {
      toast("Validation Error", {
        description: "Category is required"
      });
      return;
    }

    // Use the selected date or current date
    const finalPurchaseDate = purchaseDate || new Date();

    // Ensure it's a Date object
    const dateToSend = finalPurchaseDate instanceof Date
      ? finalPurchaseDate
      : new Date(finalPurchaseDate);

    // Implement manual form submission
    manualFormMutation.mutate({
      merchantName: merchantName.trim(),
      totalAmount: parseFloat(totalAmount),
      category: category,
      purchaseDate: dateToSend
    });
  }

  const handleFileSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bill', file);
    fileSubmitMutation.mutate(formData);
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto p-6 min-h-screen ">
      <div className="w-1/2 flex flex-col gap-6">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold">
            Xpenza: AI-Powered Expense Management
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Xpenza uses advanced AI to extract text from images, categorize bills,
            and keep track of payments effortlessly. Upload an image of your bill,
            and Xpenza will automatically process and organize your expenses.
          </p>
        </div>

        <Card className="p-6 ">
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Form</TabsTrigger>
              <TabsTrigger value="file">File Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="manual">
              <CardContent className="space-y-6 py-6">
                <Input
                  type="text"
                  placeholder="Merchant Name"
                  className="h-12"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Total Amount"
                  className="h-12"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-12 text-left">
                      {purchaseDate ? format(purchaseDate, "PPP") : "Select Purchase Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={purchaseDate}
                      onSelect={setPurchaseDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SHOPPING">Shopping</SelectItem>
                    <SelectItem value="FOOD">Food</SelectItem>
                    <SelectItem value="GROCERIES">Groceries</SelectItem>
                    <SelectItem value="TRANSPORT">Transport</SelectItem>
                    <SelectItem value="ENTERTAINMENT">Entertainment</SelectItem>
                    <SelectItem value="UTILITIES">Utilities</SelectItem>
                    <SelectItem value="OTHER">Others</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="w-full h-12 text-lg"
                  onClick={handleManualSubmit}
                  disabled={manualFormMutation.isPending}
                >
                  {manualFormMutation.isPending ? <Loader2 className="animate-spin" /> : <span>Submit</span>}
                </Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="file">
              <CardContent className="flex flex-col items-center gap-6 py-6">
                <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                  <Upload className="w-10 h-10 text-gray-500" />
                  <span className="text-lg text-gray-600">
                    Click or Drag to Upload
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
                {file && (
                  <p className="text-md text-gray-500">
                    Selected File: {file.name}
                  </p>
                )}
                <Button className="w-full h-12 text-lg" disabled={!file || fileSubmitMutation.isPending} onClick={handleFileSubmit}>
                  {fileSubmitMutation.isPending ? <Loader2 className="animate-spin" /> : <span>Upload</span>}
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        <RecentUploads />
      </div>

      <div className="w-1/2">
        <Instructions />
      </div>
    </div>
  );
}
