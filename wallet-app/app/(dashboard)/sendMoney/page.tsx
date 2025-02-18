"use client";

import { p2pTransfer } from "@/actions/p2ptransfers";
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


export default function () {
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState<number>(-1);
    const [toAccountNum, setToAccountNum] = useState<number>(-1);
    const { toast } = useToast()

    const handleTransfer = async () => {
        try {
            const response = await p2pTransfer(toAccountNum, amount);
            setMessage((response));
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
        toast({
            variant: message === "Transaction succesfull" ? "default" : "destructive" ,
            title: message,
        })
    }, [message])

    return (
        <div className="">
        <div>
            <Card className="w-3/5">
                <CardHeader>
                    <CardTitle>Peer to Peer Transfers</CardTitle>
                    <CardDescription>Do Transactions within the wallet users</CardDescription>
                </CardHeader>
                <CardContent className=" flex flex-col gap-5 pr-12">
                    <div>Enter Account Number of the person to send money</div>
                    <Input type="text" placeholder="Benificiary Accoount Number" onChange={(e) => setToAccountNum(Number(e.target.value))}/>
                    <div>Enter amount of money to be sent</div>
                    <Input type="text" placeholder="Amount to be transfered"  onChange={(e) => setAmount(Number(e.target.value))}/>
                </CardContent>
                <CardFooter className="text-center w-3/5">
                    <Button onClick={handleTransfer}>Send Money</Button>
                </CardFooter>
            </Card>
        </div>
        {/* {message && <p>{message}</p>} */}
        </div>
    )
}