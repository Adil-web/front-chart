import axios from 'axios'
import authHeader from './data-service';



const UPLOAD_FILE='/api/file/uploadFile';
const UPLOAD_FILES='/api/file/uploadMultipleFiles';
const DOWNLOAD_FILE='/api/file/downloadFile';
const GET_FILES='/api/file/get_files';


export default {


    getFiles(id) {
        return axios.get(GET_FILES+'?id='+id,{ headers: authHeader() })
    },

    uploadFile(file) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        return axios.post(  UPLOAD_FILE, file, { headers: h }   )
    },

    uploadFiles(files) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        return axios.post(UPLOAD_FILES, files, {headers: h})
    },

    downloadFile(file) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        axios.get(DOWNLOAD_FILE+'/'+file.fs_name,{responseType: 'blob', headers: h}).then(rs=>{
            const url = window.URL.createObjectURL(new Blob([rs.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.original_name);
            document.body.appendChild(link);
            link.click();
        })
    },


}
