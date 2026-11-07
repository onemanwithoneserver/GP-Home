import { Info } from "lucide-react";

export interface BuilderResponseItem {
  id: string;
  senderName: string;
  subject: string;
  propertyName: string;
  message: string;
  unread: boolean;
}

export const responsesData = {
  title: "Responses",
  subtitle: "Read replies from builders about your property enquiries.",
  allFilterLabel: "All responses",
  unreadFilterPrefix: "Unread",
  unreadBadge: "Unread",
  emptySelectionPrompt: "Select a builder response to read it.",
  defaultResponses: [
    {
      id: "resp-1",
      senderName: "Sample Homes Team",
      subject: "Details for your preferred home",
      propertyName: "Sample Garden Residences",
      message:
        "Thank you for your enquiry regarding Sample Garden Residences in Kondapur, Hyderabad. We have shared the floor plan brochure and current availability for 2 BHK ready-to-occupy residences.",
      unread: true,
    },
    {
      id: "resp-2",
      senderName: "Sample Lakeview Team",
      subject: "Your site visit enquiry",
      propertyName: "Sample Lakeview Homes",
      message:
        "Your weekend site visit request for Sample Lakeview Homes in Kokapet, Hyderabad is confirmed. Our relationship manager will assist you with a guided tour of the 3 BHK model residence.",
      unread: false,
    },
  ] as BuilderResponseItem[],
};

export { Info };
