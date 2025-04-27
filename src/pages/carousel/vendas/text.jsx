<Stack
sx={{
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  display: "flex",
  marginTop: "3rem",
  flexDirection: "column",
  gap: "10px",
  // bgcolor: "#849584",
  padding: "10px",
}}
>
<Box>
  <h2>Faça parte do nosso time aqui </h2>
</Box>

<Box
  sx={{
    width: "100%",
    display: "grid",

    gridTemplateColumns: "repeat(4, 1fr)", // 5 itens por linha em telas grandes
    gap: "10px",
    marginTop: "2rem",
    "@media (max-width: 1215px)": {
      gridTemplateColumns: "repeat(3, 1fr)", // 3 itens por linha em telas médias
      gap: "10px",
    },
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)", // 2 itens por linha em telas pequenas
      gap: "10px",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(1, 1fr)", // 2 itens por linha em telas pequenas
      gap: "10px",
    },
  }}
>
  {cardData.map((card, index) => (
    <CardItem
      key={index}
      title={card.title}
      description={card.description}
      Images={card.Images}
      textName={card.textName}
      textProfession={card.textProfession}
    />
  ))}
</Box>

<Stack
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    height: "100%",
    width: "100%",
    marginTop: "4rem",
    background:
      "linear-gradient(34deg, #121214 2%, #121214 10%, rgba(5, 33, 9, 1) 100%, rgba(10, 142, 44, 0.77) 140%)",
    color: "white",
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      width: "100%",
      height: "100%",
      padding: "20px",
      flexWrap: "wrap",
    }}
  >
    <h1
      style={{
        fontWeight: 800,
        fontSize: "2.2rem",
        color: "#3ca63a",
        textAlign: "center",
        margin: "20px 0",
        width: "100%",
        backgroundColor: "red",
      }}
    >
      Nossos Produtos Populares
    </h1>
    <Button
      sx={{
        backgroundColor: "#3ca63a",
        color: "#ffffff",
        border: "none",
        padding: "15px 20px",
        cursor: "pointer",
        borderRadius: "9px",
        "&:hover": {
          backgroundColor: "#3ca63a",
          color: "#ffffff",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      O futuro é tudo bom vamos!
    </Button>
  </Box>
  <Box
    sx={{
      width: "100%",
      display: "grid",

      gridTemplateColumns: "repeat(4, 1fr)", // 5 itens por linha em telas grandes
      gap: "10px",
      marginTop: "2rem",
      "@media (max-width: 1215px)": {
        gridTemplateColumns: "repeat(3, 1fr)", // 3 itens por linha em telas médias
        gap: "10px",
      },
      "@media (max-width: 900px)": {
        gridTemplateColumns: "repeat(2, 1fr)", // 2 itens por linha em telas pequenas
        gap: "10px",
      },
      "@media (max-width: 600px)": {
        gridTemplateColumns: "repeat(1, 1fr)", // 2 itens por linha em telas pequenas
        gap: "10px",
      },
    }}
  >
    {DataCardVendas.map((item, index) => (
      <NewOrderVendas
        key={index}
        productName={item.productName}
        imagenItem={item.imagenItem}
        price={item.price}
        icon={item.icon}
        cartIcon={item.cartIcon}
      />
    ))}
  </Box>
</Stack>
</Stack>