import PlayerModel from "../models/player-model";
import fs from "fs/promises";

// retorna todos os jogadores
export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  const data = await fs.readFile("./src/data/players.json", "utf-8");
  const players = JSON.parse(data);
  return players;
}

// encontra um jogador pelo ID
export const findPlayersById = async (id: number): Promise<PlayerModel | undefined> => {
  const players = await findAllPlayers();
  return players.find( player => player.id === id)
}

// inserir um novo jogador no arquivo
export const insertPlayer = async (player: PlayerModel) => {
  const players = await findAllPlayers();
  players.push(player);
  await fs.writeFile("./src/data/players.json", JSON.stringify(players, null, 2));
}

// exclui um jogador
export const deleteOnePlayerById = async (id: number) => {
  let players = await findAllPlayers();
  const index = players.findIndex( (p) => p.id === id);
  
  if (index !== -1) {
    players.splice(index, 1);
    await fs.writeFile("./src/data/players.json", JSON.stringify(players, null, 2));
    return true;
  } 

  return false;
}

// atualiza as estatísticas de um jogador
export const findAndModifyPlayer = async (id: number, statistics: StatisticsModel): Promise<PlayerModel> => {
  let players = await findAllPlayers();
  const index = players.findIndex( (p) => p.id === id);
  
  if (index !== -1) {
    players[index].statistics = statistics;
    await fs.writeFile("./src/data/players.json", JSON.stringify(players, null, 2));
  }
  
  return players[index];
}
