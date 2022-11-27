const checkApiResponse = async (response : Response) => {
  if(!response.ok) return Promise.reject(await response.json());

  return response.json()
}

export default checkApiResponse;