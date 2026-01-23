"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function DataSelects() {
    const [dataSelected, setDataSelected] = useState("servers"); 

    return (
        <div className="mt-6">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={dataSelected === "servers" ? "default" : "outline"}
              onClick={() => setDataSelected("servers")}
            >
              Lista de Servidores
            </Button>

            <Button 
              variant={dataSelected === "charts" ? "default" : "outline"}
              onClick={() => setDataSelected("charts")}
            >
              Gráfico de informações
            </Button>
          </div>

          {dataSelected == "servers" ? (
                <div>
                    servers table
                </div>
            ) : (
                <div>
                    charts
                </div>
            )}
        </div>

    )

}