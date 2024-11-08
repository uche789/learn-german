import { FormEventHandler, useState } from "react";
import { uploadFile } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function VocabFileUpload() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [file, setFile] = useState<File | undefined>()
  const navigate = useNavigate()

  const upload: FormEventHandler<HTMLFormElement> = async (e) => {
    setError(false)

    e.preventDefault();

    if (!file || loading) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true)
      await uploadFile(formData)
      navigate('/admin')
    } catch {
      alert('An error occurred');
    } finally {
      setLoading(false)
    }
  }

  return (
    <article>
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={upload} className="p-4 bg-gray-100 rounded">
        <label htmlFor="file-upload" className="font-md font-semibold mb-2 text-lg">Upload file</label>
        <div className="my-4">
          <input
            id="file-upload"
            type="file"
            accept="application/json"
            onChange={(e) => setFile(e.target.files![0])}
          />
          </div>
        <div className="mb-4">
          <button type="submit" className="p-2 border rounded bg-blue-500 text-white">Upload</button>
        </div>
      </form>
    </article>
  );
}