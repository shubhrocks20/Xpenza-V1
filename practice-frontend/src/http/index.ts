import axiosInstance from "@/routes/axiosInstance"

export const googleAuth = async(access_token: string) => {
    const response  = await axiosInstance.post(`/users/auth/google?access_token=${access_token}`)
    return response.data
}
export const login = async(data: {emailOrUsername: string, password: string}) => {
    const response = await axiosInstance.post(`/users/login`, data);
    return response.data
}
export const githubAuth =  async(code: string) => {
    const response  = await axiosInstance.post(`/users/auth/github?code=${code}`)
    return response.data
}
export const profile = async() => {
    const response = await axiosInstance.get(`/users/me`)
    return response.data
}

export const updateUser = async (data: FormData) => {
    const response = await axiosInstance.patch(`/users/`, data, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    })
    return response.data
}

