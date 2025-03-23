export const getImgUrl = async (req, res, next) => {
  try {
    const { imgUrl } = req.body;

    const isUrlValidValid = (imgUrl) =>
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        imgUrl.trim(),
      );

    if (!isUrlValidValid(imgUrl)) {
      return res.status(422).json({ error: "Enter a valid URL" });
    } else {
      const id = imgUrl.split("/")[5];
      return res.status(200).json({
        coverImageUrl: `https://drive.google.com/uc?export=view&id=${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
