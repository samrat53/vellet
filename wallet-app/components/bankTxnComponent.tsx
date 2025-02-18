"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { txnType } from "@/app/config/types";
import { bankTransfers } from "@/actions/bankTransfers";


export default function CreateBankTransaction({heading, description, label, type} : {
    heading: string,
    description: string,
    label: string,
    type: txnType
}) {

    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState<number>(-1);
    const { toast } = useToast()

    const handleTransfer = async () => {
        setMessage("");
        try {
            const response = await bankTransfers(amount, type);
            setMessage(response ?? "");
        } catch (error) {
            // Type assertion for error
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage("An unknown error occurred");
            }
        }
    };

    useEffect(()=> {
        if(message !== "") {
            toast({
                variant: message === "Transfer done" ? "default" : "destructive" ,
                title: message,
            })
        }
    }, [message])

    return (
        <div className="">
        <div>
            <Card className="w-3/5">
                <CardHeader>
                    <CardTitle>{heading}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 pr-12">
                    <div>{label}</div>
                    <Input type="text" placeholder="Amount of money in Rupees" onChange={(e) => setAmount(Number(e.target.value))}/>
                    </CardContent>
                <CardFooter className="text-center w-3/5">
                    <Button onClick={handleTransfer}>Create Transaction</Button>
                </CardFooter>
            </Card>
        </div>
        {/* {message && <p>{message}</p>} */}
        </div>
    )
}