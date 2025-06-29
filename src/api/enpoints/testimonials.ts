import axios from "../axiosInstance";

export const getAllTestimonials = async () => {
  const response = await axios.get("/testimonials");

  const testimonials = await Promise.all(
    response.data.docs.map(async (testimonialData: any) => {
      const { id, name, position, testimonial, stars, image } = testimonialData;

      return {
        id: id,
        image: "http://localhost:3001" + image[0].url,
        name,
        role: position,
        content: testimonial,
        rating: parseInt(stars),
      };
    })
  );
  return testimonials;
};
