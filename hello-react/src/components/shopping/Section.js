import Grid from "./Grid";
import Item from "./Item";

export default function Section({ headerTitle, gridRows, gridCols, itemList }) {
  return (
    <section>
      <header>{headerTitle}</header>
      <Grid rows={gridRows} cols={gridCols}>
        {itemList.map(({ itemId, image, title }) => (
          <Item key={itemId} src={image} title={title} />
        ))}
      </Grid>
    </section>
  );
}
