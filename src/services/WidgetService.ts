import http from "../http-common";
import IWidgetData from "../types/Widget";

const getAll = () => {
  return http.get<Array<IWidgetData>>("/widgets");
};

const create = async (data: IWidgetData) => {
  return http.post<IWidgetData>("/widgets", data);
};

const update = (id: any, data: IWidgetData) => {
  return http.patch<any>(`/widgets/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/widgets/${id}`);
};

const WidgetService = {
  getAll,
  create,
  update,
  remove
};

export default WidgetService;
