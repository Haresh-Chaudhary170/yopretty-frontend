// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Loader, PlusCircle } from "lucide-react";
// import { motion } from "framer-motion";

// interface KycForm {
//   typeOfDocument: string;
//   name: string;
//   image: File | null;
// }

// const KycVerification = () => {
//   const { toast } = useToast();
//   const providerId = useSelector((state: RootState) => state.auth.userId);
//   const [loading, setLoading] = useState(false);
//   const [forms, setForms] = useState<KycForm[]>([{ typeOfDocument: "", name: "", image: null }]);

//   const handleInputChange = (index: number, field: keyof KycForm, value: string | File | null) => {
//     const updatedForms = [...forms];
//     updatedForms[index][field] = value as never;
//     setForms(updatedForms);
//   };

//   const handleSubmit = async (index: number) => {
//     setLoading(true);

//     const formData = new FormData();
//     if (providerId) {
//       formData.append("providerId", providerId);
//     }
//     formData.append("typeOfDocument", forms[index].typeOfDocument);
//     formData.append("name", forms[index].name);
//     if (forms[index].image) {
//       formData.append("image", forms[index].image as Blob);
//     }

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/kyc-verification`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast({
//         title: "Success",
//         description: "Document submitted successfully.",
//       });

//       // Collapse this form and open a new one
//       setForms([...forms, { typeOfDocument: "", name: "", image: null }]);
//     } catch (error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to upload document.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 md:p-10">
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-lg space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-gray-900">KYC Verification</h1>
//         <p className="text-gray-600 text-center">Submit your documents for verification</p>

//         {forms.map((form, index) => (
//           <motion.div 
//             key={index} 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="shadow-lg rounded-lg bg-white">
//               <CardHeader>
//                 <h2 className="text-lg font-semibold text-gray-800">Document {index + 1}</h2>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4">
//                 {/* Type of Document */}
//                 <div>
//                   <Label className="text-gray-700">Type of Document</Label>
//                   <Select onValueChange={(value) => handleInputChange(index, "typeOfDocument", value)}>
//                     <SelectTrigger className="mt-1">
//                       <SelectValue placeholder="Select document type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="passport">Passport</SelectItem>
//                       <SelectItem value="national_id">National ID</SelectItem>
//                       <SelectItem value="driver_license">Driver&apos;s License</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Name */}
//                 <div>
//                   <Label className="text-gray-700">Full Name</Label>
//                   <Input
//                     type="text"
//                     placeholder="Enter full name"
//                     value={form.name}
//                     onChange={(e) => handleInputChange(index, "name", e.target.value)}
//                     required
//                     className="mt-1"
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <Label className="text-gray-700">Upload Document</Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleInputChange(index, "image", e.target.files?.[0] || null)}
//                     className="mt-1"
//                   />
//                 </div>

//                 <Button
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
//                   onClick={() => handleSubmit(index)}
//                   disabled={loading}
//                 >
//                   {loading ? <Loader className="animate-spin" /> : "Submit"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}

//         {/* Add More Button */}
//         <motion.div 
//           whileHover={{ scale: 1.05 }} 
//           whileTap={{ scale: 0.95 }}
//         >
//           <Button
//             variant="outline"
//             className="w-full mt-4 flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
//             onClick={() => setForms([...forms, { typeOfDocument: "", name: "", image: null }])}
//           >
//             <PlusCircle size={20} />
//             Add More
//           </Button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default KycVerification;
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, PlusCircle, X } from "lucide-react";
import { motion } from "framer-motion";

interface CertificationForm {
  title: string;
  issuingOrganization: string;
  certificateFile: File | null;
}

const KycAndCertifications = ({ onComplete }: { onComplete: () => void }) => {
  const { toast } = useToast();
  const providerId = useSelector((state: RootState) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [certifications, setCertifications] = useState<CertificationForm[]>([{ title: "", issuingOrganization: "", certificateFile: null }]);
  const [kyc, setKyc] = useState({ providerId, type: "", name: "", image: null });

  const handleKycChange = (field: string, value: string | File | null) => {
    setKyc((prev) => ({ ...prev, [field]: value }));
  };

  const handleCertInputChange = (index: number, field: keyof CertificationForm, value: string | File | null) => {
    const updatedCerts = [...certifications];
    updatedCerts[index][field] = value as never;
    setCertifications(updatedCerts);
  };

  const addCertification = () => {
    setCertifications([...certifications, { title: "", issuingOrganization: "", certificateFile: null }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (kyc.providerId) {
      formData.append("providerId", kyc.providerId);
    }
    formData.append("type", kyc.type);
    formData.append("name", kyc.name);
    if (kyc.image) {
      formData.append("image", kyc.image as Blob);
    }

    certifications.forEach((cert, index) => {
      formData.append(`certifications[${index}][title]`, cert.title);
      formData.append(`certifications[${index}][issuingOrganization]`, cert.issuingOrganization);
      if (cert.certificateFile) {
        formData.append(`certifications[${index}][certificateFile]`, cert.certificateFile as Blob);
      }
    });

    console.log("FormData Entries:", [...formData.entries()]);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/upload-kyc-certifications`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Success",
        description: "KYC and Certifications submitted successfully.",
      });
      onComplete();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit KYC and certifications.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 md:p-10">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">KYC & Certifications</h1>
        <p className="text-gray-600 text-center">Complete your verification and add certifications</p>

        <Card className="shadow-lg rounded-lg bg-white p-6">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">KYC Verification</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <Label className="text-gray-700">Provider ID</Label>
            <Input type="text" value={kyc.providerId || ""} disabled className="mt-1 bg-gray-200" /> */}

            <Label className="text-gray-700">Type of Document</Label>
            <Select onValueChange={(value) => handleKycChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PASSPORT">Passport</SelectItem>
                <SelectItem value="ID_PROOF">ID Proof</SelectItem>
                <SelectItem value="DRIVING_LICENSE">Driving License</SelectItem>
                <SelectItem value="VOTER_ID_CARD">Voter ID</SelectItem>
                <SelectItem value="PAN_CARD">PAN Card</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>

            <Label className="text-gray-700">Name</Label>
            <Input type="text" placeholder="Your Full Name" className="mt-1" onChange={(e) => handleKycChange("name", e.target.value)} />

            <Label className="text-gray-700">Upload KYC Document</Label>
            <Input type="file" accept="image/*" className="mt-1" onChange={(e) => handleKycChange("image", e.target.files?.[0] || null)} />
          </CardContent>
        </Card>

        {certifications.map((cert, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg rounded-lg bg-white p-6">
              <CardHeader>
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Certification {index + 1}</span>
                  <span className="text-red-600 hover:cursor-pointer hover:text-red-400" onClick={() => removeCertification(index)}><X /></span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label className="text-gray-700">Title</Label>
                <Input type="text" placeholder="Certification Title" className="mt-1" onChange={(e) => handleCertInputChange(index, "title", e.target.value)} />
                <Label className="text-gray-700">Issuing Organization</Label>
                <Input type="text" placeholder="Issuing Organization" className="mt-1" onChange={(e) => handleCertInputChange(index, "issuingOrganization", e.target.value)} />
                <Label className="text-gray-700">Upload Certificate</Label>
                <Input type="file" accept="image/*" className="mt-1" onChange={(e) => handleCertInputChange(index, "certificateFile", e.target.files?.[0] || null)} />
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4" onClick={addCertification}><PlusCircle className="mr-2" /> Add More</Button>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-6" onClick={handleSubmit} disabled={loading}>{loading ? <Loader className="animate-spin" /> : "Submit KYC & Certifications"}</Button>
      </div>
    </div>
  );
};

export default KycAndCertifications;
