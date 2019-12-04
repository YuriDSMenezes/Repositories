import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import api from '../../services/api';

import Container from '../../components/Container'

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: 0,
    error: null
  };

  //carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) })
    }
  }

  //Salvar os dados do localStorage
  componentDidUpdate(_, prevState) { //acessa as atualizações do estado
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null});
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: 1, error: false });
    try {
      const { newRepo, repositories } = this.state;

      if(newRepo === '') throw new Error('Você precisa indicar um repositório')

      const hasRepo = repositories.find(repository => repository.name === newRepo)

      if(hasRepo) throw new Error('Repositório duplicado')

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ error: true })

    } finally {
      this.setState({ loading: 0 })
    }
  }
  render() {
    const { newRepo, loading, repositories, error} = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus color="#FFF" size={14} />
              )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/* encode por causa da / na URL que seria um endereço a mais */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
