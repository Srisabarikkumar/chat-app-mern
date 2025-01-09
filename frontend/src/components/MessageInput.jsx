import { useRef, useState } from "react";
import { useChatStore } from "../zustand/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImg = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imgPreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imgPreview,
      });

      setText("");
      setImgPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImg}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImgChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle tooltip tooltip-up
                ${imgPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            data-tip="image"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn flex hover:btn-primary btn-circle tooltip tooltip-up"
          data-tip="send"
          disabled={!text.trim() && !imgPreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
