import { toast } from "sonner"

const validateUploadedCsvFiles = async (): Promise<boolean> => {

    const solarGenData = JSON.parse(localStorage.getItem('solarGenData') || '[]')
    const solarCapData = JSON.parse(localStorage.getItem('solarCapData') || '[]')


    // Validate headers
    const solarGenHeaders = Object.keys(solarGenData[0])
    const solarCapHeaders = Object.keys(solarCapData[0])

    const validateHeaders = (headers: string[]) => {
        headers.forEach((header, index) => {
            if (index == 0 && header != "State") {
                return false
            }
            if (index != 1 && !header.includes("-")) {
                return false
            }

        })
        return true
    }

    const isSolarGenValid = validateHeaders(solarGenHeaders)
    const isSolarCapValid = validateHeaders(solarCapHeaders)

    if (!isSolarGenValid || !isSolarCapValid) {
        toast.error("CSV headers do not match the required format. Check the sample CSV files", {
            position: "top-center",
            style: {
                background: "#dc2626",
                color: "#fff",
                border: "1px solid #b91c1c",
            }
        })
        return false
    }

    return true

}
export default validateUploadedCsvFiles;