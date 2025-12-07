import IssueCard from "./IssueCard";

const issue = {
  id: "123",
  image: "https://www.designboom.com/wp-content/uploads/2023/09/facebook-new-logo-change-designboom-02.jpg",
  title: "Broken Streetlight in Road 12",
  category: "Streetlight",
  status: "Pending",
  priority: "Normal",
  location: "Mirpur-10, Dhaka",
  upvotes: 42,
};

export default function IssueList() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <IssueCard issue={issue} />
    </div>
  );
}
