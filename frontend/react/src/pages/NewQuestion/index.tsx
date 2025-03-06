import { PaperPlaneRight, Link, Tag, CurrencyDollar } from "phosphor-react";
import { Container, Form, TitleInput, DescriptionTextArea, RepositoryInput, TagsInput, Button, AmountInput } from "./style";
import { NavLink } from "react-router-dom";

export function NewQuestion() {
  return (
    <Container>
      <h2>Create Question</h2>
      <Form>
        <TitleInput type="text" placeholder="Title" />
        <DescriptionTextArea placeholder="Describe your issue..." />

        <AmountInput>
          <CurrencyDollar size={20} />
          <input type="text" placeholder="Amount" />
        </AmountInput>

        <RepositoryInput>
          <Link size={20} />
          <input type="text" placeholder="Link to repository" />
        </RepositoryInput>

        <TagsInput>
          <Tag size={20} />
          <input type="text" placeholder="Tags" />
        </TagsInput>

        <div className="buttons">
          <NavLink to="/forum/:name">
            <Button variant="cancel">Discard</Button>
          </NavLink>
          <Button variant="publish">
            Publish <PaperPlaneRight size={20} />
          </Button>
        </div>
      </Form>
    </Container>
  );
}