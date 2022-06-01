import { Request, Response } from "express";
import { Op } from "sequelize";
import ProductoEntity from "../model_mysql/product";
import SaleEntity from "../model_mysql/sales";
import UserEntity from "../model_mysql/user";

export const getSales = async (req: Request, res: Response) => {
  try {

      const sales = await SaleEntity.findAll({
          order: ["id"],
        });

    // SaleEntity.belongsTo(UserEntity,{foreignKey : "user_id"});
    res.json({ sales });
  } catch (error) {
    res.json([]);
  }
};
export const getSalesFecha = async (req: Request, res: Response) => {
  const { fecha_desde, fecha_hasta } = req.params;
  try {
    const sales = await SaleEntity.findAll({
      where: {
        created_at: { [Op.between]: [fecha_desde, fecha_hasta] },
      },
      order: ["id"],
    });
    res.json({ sales });
  } catch (error) {
    res.json([]);
  }
};
