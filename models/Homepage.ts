import "server-only";

import mongoose, { Schema } from "mongoose";

const HomepageSchema = new Schema(
  {
    hero: {
      backgroundVideo: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" },
      },
      heading: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      cta1: {
        label: { type: String, default: "" },
        url: { type: String, default: "" },
        enabled: { type: Boolean, default: false },
      },
      cta2: {
        label: { type: String, default: "" },
        url: { type: String, default: "" },
        enabled: { type: Boolean, default: false },
      },
      overlayOpacity: { type: Number, default: 0 },
      isVisible: { type: Boolean, default: false },
    },
    sections: [
      {
        type: { type: String, required: true },
        isVisible: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        content: { type: Schema.Types.Mixed, default: {} },
      },
    ],
  },
  {
    collection: "homepages",
    timestamps: true,
  },
);

const Homepage =
  mongoose.models.Homepage || mongoose.model("Homepage", HomepageSchema);

export default Homepage;
