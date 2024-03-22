import pq from "pq";
import { BDconfig } from "../../BD";

const client =new pq.Client(BDconfig);
client.connect();