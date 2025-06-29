import axios from "../axiosInstance";

export const getAllProjects = async () => {
  const response = await axios.get("/works");

  console.log(response.data);

  const projects = await Promise.all(
    response.data.docs.map(async (project: any) => {
      const {
        id,
        title,
        images,
        description,
        category,
        technologies,
        challenge,
        solutions,
        clientName,
        finishDate,
      } = project;

      return {
        id: id,
        image: "http://localhost:3001" + images[0].url,
        title: title,
        description: description.slice(0, 150),
        fullDescription: description,
        category,
        tags: technologies,
        client: clientName,
        completionDate: finishDate?.toString(),
        teamSize: 5,
        technologies,
        challenges: [challenge],
        solutions: [solutions],
        results: [],
        link: "",
      };
    })
  );
  return projects;
};

export const getProjectById = async (projectId: string) => {
  const { data } = await axios.get(`/proyectos/${projectId}`);
  const { acf, id, title } = data;
  const imageIds = [
    acf.imagen_principal,
    acf.imagen_2,
    acf.imagen_3,
    acf.imagen_4,
    acf.imagen_5,
    acf.imagen_6,
    acf.imagen_7,
  ];

  const { data: images } = await axios.get(
    `/media?include=${imageIds.join(",")}`
  );
  const imageMap = Object.fromEntries(
    images.map(({ id, source_url }: any) => [id, source_url])
  );

  return {
    id,
    title: title.rendered,
    description: acf.descripcion,
    image: imageMap[acf.imagen_principal],
    tags: [acf.categoria],
    clientName: acf.nombre_de_cliente,
    objective: acf.objetivo_del_proyecto,
    challenge: acf.desafio,
    solution: acf.solucion__enfoque,
    testimonial: {
      quote: acf.resena_de_client,
      author: acf.nombre_de_cliente,
      position: acf.cargo_del_cliente,
    },
    technologies: acf.subcategorias?.split(/\r?\n/) || [],
    gallery: {
      main: imageMap[acf.imagen_principal],
      secondary: imageIds.slice(1, 3).map((id) => imageMap[id]),
      tertiary: imageIds.slice(3).map((id) => imageMap[id]),
    },
  };
};
