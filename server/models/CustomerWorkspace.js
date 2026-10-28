import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, maxlength: 2000, default: "" },
  status: { type: String, enum: ["Planning", "In progress", "Review", "Completed", "On hold"], default: "Planning" },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  dueDate: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, maxlength: 1000, default: "" },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Pending", "Cancelled"], default: "Active" },
  amount: { type: Number, min: 0, default: 0 },
  currency: { type: String, default: "INR", maxlength: 3 }
}, { _id: true });

const paymentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: "INR", maxlength: 3 },
  status: { type: String, enum: ["Pending", "Paid", "Overdue", "Refunded"], default: "Pending" },
  invoiceNumber: { type: String, trim: true, default: "" },
  dueDate: { type: Date, default: null },
  paidAt: { type: Date, default: null },
  notes: { type: String, trim: true, maxlength: 1000, default: "" }
}, { _id: true, timestamps: true });

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  senderName: { type: String, required: true, maxlength: 100 },
  senderRole: { type: String, enum: ["admin", "customer"], required: true },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  detail: { type: String, trim: true, maxlength: 1000, default: "" },
  type: { type: String, enum: ["update", "project", "payment", "product", "message", "account"], default: "update" },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const workspaceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
  company: { type: String, trim: true, maxlength: 160, default: "" },
  phone: { type: String, trim: true, maxlength: 40, default: "" },
  customerStatus: { type: String, enum: ["Lead", "Active", "Paused", "Former"], default: "Active" },
  notes: { type: String, trim: true, maxlength: 3000, default: "" },
  projects: [projectSchema],
  products: [productSchema],
  payments: [paymentSchema],
  messages: [messageSchema],
  activities: [activitySchema]
}, { timestamps: true });

export default mongoose.models.CustomerWorkspace || mongoose.model("CustomerWorkspace", workspaceSchema);
