import axiosInstance from "@/routes/axiosInstance"

export const googleAuth = async(access_token: string) => {
    const response  = await axiosInstance.post(`/users/auth/google?access_token=${access_token}`)
    return response.data
}

export const profile = async() => {
    const response = await axiosInstance.get(`/users/me`)
    return response.data
}