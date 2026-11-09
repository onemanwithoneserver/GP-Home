import { Info } from "lucide-react";

export interface BuilderResponseItem {
  id: string;
  senderName: string;
  subject: string;
  propertyName: string;
  message: string;
  unread: boolean;
  time: string;
  date: string;
  verified: boolean;
}

export const responsesData = {
  title: "Responses",
  subtitle: "Read replies from builders about your property enquiries.",
  unreadBadge: "New",
  readBadge: "Read",
  emptyUnreadMessage: "No unread responses at the moment.",
  emptyReadMessage: "No read responses found.",
  defaultResponses: [
    {
      id: "resp-1",
      senderName: "Sample Homes Team",
      subject: "Details for your preferred home",
      propertyName: "Sample Garden Residences",
      message:
        "Thank you for your enquiry regarding Sample Garden Residences in Kondapur, Hyderabad. We have shared the floor plan brochure and current availability for 2 BHK ready-to-occupy residences.",
      unread: true,
      time: "10:30 AM",
      date: "Today",
      verified: true,
    },
    {
      id: "resp-2",
      senderName: "Lakeview Luxury Estates",
      subject: "Invitation for private preview of Lakeview Villas",
      propertyName: "Lakeview Villas",
      message:
        "We are pleased to invite you for an exclusive private walkthrough of our lake-facing signature villas in Kokapet, Hyderabad. Our dedicated relationship director will be on site to assist you with floor plans and booking formalities.",
      unread: true,
      time: "11:15 AM",
      date: "Today",
      verified: true,
    },
    {
      id: "resp-3",
      senderName: "Sample Lakeview Team",
      subject: "Your site visit enquiry",
      propertyName: "Sample Lakeview Homes",
      message:
        "Your weekend site visit request for Sample Lakeview Homes in Kokapet, Hyderabad is confirmed. Our relationship manager will assist you with a guided tour of the 3 BHK model residence.",
      unread: false,
      time: "3:45 PM",
      date: "Yesterday",
      verified: true,
    },
    {
      id: "resp-4",
      senderName: "Skyline Prime Living",
      subject: "Pricing schedule and floor plan options",
      propertyName: "Skyline Enclave",
      message:
        "Please find enclosed the updated payment milestone schedule and 3 & 4 BHK sky apartment layouts for Skyline Enclave in Gachibowli, Hyderabad.",
      unread: false,
      time: "5:20 PM",
      date: "Nov 6",
      verified: true,
    },
  ] as BuilderResponseItem[],
};

export { Info };
