import React, { useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        fontSize: 12,
        padding: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        textTransform: "uppercase",
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 20,
        marginTop: 50,
    },
    tableRow: {
        flexDirection: "row",
        minHeight: "35px",
    },
    tableHeaderCell: {
        backgroundColor: "#D3D3D3",
        padding: 5,
        fontSize: 12,
        fontWeight: "bold",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        textAlign: "center",
        alignItems: "center",
    },
    tableCell: {
        padding: 5,
        fontSize: 12,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        textAlign: "center",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "uppercase",
    },
    pageNumber: {
        position: "absolute",
        fontSize: "12px",
        bottom: "30",
        left: "0",
        right: "0",
        textAlign: "center",
        color: "grey",
    },
});

const MyWishListPdf = ({ list, items }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>{list.wishlists_name}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeaderCell, { width: "30%" }]}>Name</Text>
                        <Text style={[styles.tableHeaderCell, { width: "15%" }]}>Price</Text>
                        <Text style={[styles.tableHeaderCell, { width: "15%" }]}>Rank</Text>
                        <Text style={[styles.tableHeaderCell, { width: "15%" }]}>Quantity</Text>
                        <Text style={[styles.tableHeaderCell, { width: "25%" }]}>Place to Buy</Text>
                    </View>
                    {items.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={[styles.tableCell, { width: "30%" }]}>{item.items_name}</Text>
                            <Text style={[styles.tableCell, { width: "15%" }]}>${item.items_price}</Text>
                            <Text style={[styles.tableCell, { width: "15%" }]}>{item.items_ranking}/5</Text>
                            <Text style={[styles.tableCell, { width: "15%" }]}>{item.items_quantity}</Text>
                            <Text style={[styles.tableCell, { width: "25%" }]}>{item.items_shop}</Text>
                        </View>
                    ))}
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};

export default MyWishListPdf;
