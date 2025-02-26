import { Request, Response } from "express";
import * as PlayerService from "../services/players-service";

// busca os jogadores
export const getPlayer = async (req: Request, res: Response) => {
    const httpResponse = await PlayerService.getPlayerService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// busca os jogadores por ID
export const getPlayerByID = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const httpResponse = await PlayerService.getPlayerByIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// cria um novo jogador
export const postPlayer = async(req: Request, res: Response) => {
    const bodyValue = req.body;
    const httpResponse = await PlayerService.createPlayerService(bodyValue);
    
    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } 
}

// exclui um jogador específico
export const deletePlayer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const httpResponse = await PlayerService.deletePlayerService(id);
    
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// atualiza as informações de um jogador
export const updatePlayer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const bodyValue: StatisticsModel = req.body;
    const httpResponse = await PlayerService.updatePlayerService(id, bodyValue);

    res.status(httpResponse.statusCode).json(httpResponse);
}
