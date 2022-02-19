import { uploadFile } from "../../api";
import { useMutation } from "react-query";

const UploadFile = () => {
    const mutate = useMutation((data) => uploadFile(data));
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        mutate.mutate(data);
    };
    if (mutate.isLoading) return <h3>Uploading...</h3>;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" />
                <input type="text" name="name" />
                <input type="submit" name="Submit" />
            </form>
        </div>
    );
};

export default UploadFile;
