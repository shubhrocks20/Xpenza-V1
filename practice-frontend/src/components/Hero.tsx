import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Upload } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
export default function XpenzaUpload() {
  const [file, setFile] = useState<any>(null);

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

  return (
    <div className="w-full max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-center">
      {/* Hero Section */}
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

      {/* Tabs Section */}
      <Card className="p-6">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Form</TabsTrigger>
            <TabsTrigger value="file">File Upload</TabsTrigger>
          </TabsList>

          {/* Manual Form */}
          <TabsContent value="manual">
            <CardContent className="space-y-6 py-6">
              <Input type="text" placeholder="Merchant Name" className="h-12" />
              <Input
                type="number"
                placeholder="Total Amount"
                className="h-12"
              />
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full h-12 text-lg">Submit</Button>
            </CardContent>
          </TabsContent>

          {/* File Upload */}
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
              <Button className="w-full h-12 text-lg" disabled={!file}>
                Upload
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
